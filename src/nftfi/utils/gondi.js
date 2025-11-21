class UtilsGondi {
  #config;
  #contractFactory;
  #result;
  #error;
  #provider;
  #account;
  #ethers;

  constructor(options = {}) {
    this.#config = options?.config;
    this.#contractFactory = options?.contractFactory;
    this.#result = options?.result;
    this.#error = options?.error;
    this.#provider = options?.provider;
    this.#account = options?.account;
    this.#ethers = options?.ethers;
  }

  async getGondiLoanDetails(hash) {
    let address, abi, name;
    const receipt = await this.#provider.getTransactionReceipt(hash);
    address = receipt.to;

    if (address.toLowerCase() === this.#config.protocol.gondi.loan.v3.address.toLowerCase()) {
      abi = this.#config.protocol.gondi.loan.v3.abi;
      name = this.#config.protocol.gondi.loan.v3.name;
    } else if (address.toLowerCase() === this.#config.protocol.gondi.loan.v3_1.address.toLowerCase()) {
      abi = this.#config.protocol.gondi.loan.v3_1.abi;
      name = this.#config.protocol.gondi.loan.v3_1.name;
    } else {
      const { contractAddress } = await this.findEventLog(hash);
      if (contractAddress.toLowerCase() === this.#config.protocol.gondi.loan.v3.address.toLowerCase()) {
        abi = this.#config.protocol.gondi.loan.v3.abi;
        name = this.#config.protocol.gondi.loan.v3.name;
      } else if (contractAddress.toLowerCase() === this.#config.protocol.gondi.loan.v3_1.address.toLowerCase()) {
        abi = this.#config.protocol.gondi.loan.v3_1.abi;
        name = this.#config.protocol.gondi.loan.v3_1.name;
      }
    }
    return { address, abi, name };
  }

  async findEventLog(hash) {
    const receipt = await this.#provider.getTransactionReceipt(hash);
    const abi = this.#config.protocol.gondi.loan.v3.abi;
    const iface = new this.#ethers.utils.Interface(abi);

    const eventNames = ['LoanRefinancedFromNewOffers', 'LoanRefinanced', 'LoanEmitted'];

    let eventLog = null;
    for (const eventName of eventNames) {
      eventLog = receipt.logs.find(log => {
        try {
          const parsed = iface.parseLog(log);
          return parsed.name === eventName;
        } catch (e) {
          return false;
        }
      });
      if (eventLog) break;
    }

    const parsedEvent = iface.parseLog(eventLog);
    return { parsedEvent, contractAddress: eventLog.address };
  }

  async getLoanData(hash) {
    const { name: gondiContractName } = await this.getGondiLoanDetails(hash);
    const { parsedEvent } = await this.findEventLog(hash);
    return { loanData: parsedEvent.args.loan, gondiContractName: gondiContractName };
  }

  async getBorrowerRepaymentSignature(hash) {
    const provider = this.#provider;
    const { chainId } = await provider.getNetwork();
    const { address: gondiContractAddress, abi: gondiAbi } = await this.getGondiLoanDetails(hash);

    const { parsedEvent } = await this.findEventLog(hash);
    const gondiContract = this.#contractFactory.create({
      address: gondiContractAddress,
      abi: gondiAbi
    });
    const name = await gondiContract.call({ function: 'name', args: [] });
    const versionBytes = await gondiContract.call({ function: 'VERSION', args: [] });
    const version = this.#ethers.utils.toUtf8String(versionBytes);

    const domain = {
      name: name,
      version: version,
      chainId: chainId,
      verifyingContract: gondiContractAddress
    };

    const types = {
      SignableRepaymentData: [
        { name: 'loanId', type: 'uint256' },
        { name: 'callbackData', type: 'bytes' },
        { name: 'shouldDelegate', type: 'bool' }
      ]
    };

    let loanId;
    if (parsedEvent.name === 'LoanRefinanced' || parsedEvent.name === 'LoanRefinancedFromNewOffers') {
      loanId = parsedEvent.args.newLoanId.toString();
    } else {
      loanId = parsedEvent.args.loanId.toString();
    }

    console.log('Loan ID:', loanId);

    const repaymentValue = {
      loanId: loanId,
      callbackData: '0x',
      shouldDelegate: false
    };

    const signature = await this.#account.signTypedData(domain, types, repaymentValue);
    return {
      signature: signature,
      repaymentValue: repaymentValue
    };
  }

  async getRefinancingData({ hash }) {
    try {
      const { loanData, gondiContractName } = await this.getLoanData(hash);
      const { signature, repaymentValue } = await this.getBorrowerRepaymentSignature(hash);

      const { address: gondiContractAddress } = await this.getGondiLoanDetails(hash);
      const gondiLoanId = repaymentValue.loanId;

      const loanRepaymentData = {
        data: repaymentValue,
        loan: loanData,
        borrowerSignature: signature
      };
      const abiCoder = new this.#ethers.utils.AbiCoder();
      const encodedRefinancingData = abiCoder.encode(
        [
          'tuple(tuple(uint256 loanId, bytes callbackData, bool shouldDelegate) data, tuple(address borrower, uint256 nftCollateralTokenId, address nftCollateralAddress, address principalAddress, uint256 principalAmount, uint256 startTime, uint256 duration, tuple(uint256 loanId, uint256 floor, uint256 principalAmount, address lender, uint256 accruedInterest, uint256 startTime, uint256 aprBps)[] tranche, uint256 protocolFee) loan, bytes borrowerSignature)'
        ],
        [loanRepaymentData]
      );

      const gondiAdapterContract = this.#contractFactory.create({
        address: this.#config.protocol.v3.adaptors.gondi.address,
        abi: this.#config.protocol.v3.adaptors.gondi.abi
      });

      const payoffDetails = await gondiAdapterContract.call({
        function: 'getPayoffDetails',
        args: [gondiContractAddress, gondiLoanId, encodedRefinancingData]
      });

      return this.#result.handle({
        gondiContractName: gondiContractName,
        repaymentAmount: payoffDetails[1].toString(),
        encodedRefinancingData
      });
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  isRefinanceable(address) {
    if (address.toLowerCase() === this.#config.protocol.gondi.loan.v3_1.address.toLowerCase()) {
      return this.#result.handle({ isRefinanceable: true });
    } else if (address.toLowerCase() === this.#config.protocol.gondi.loan.v3.address.toLowerCase()) {
      return this.#result.handle({ isRefinanceable: true });
    }
    return this.#result.handle({ isRefinanceable: false });
  }
}

export default UtilsGondi;
