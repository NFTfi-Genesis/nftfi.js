class LoansAssetOfferV1 {
  #config;
  #contractFactory;
  #ethers;
  #loanContract;
  #loanCoordinator;
  #refinanceContract;

  constructor(options) {
    this.#config = options?.config;
    this.#contractFactory = options?.contractFactory;
    this.#ethers = options?.ethers;
  }

  get _loanCoordinator() {
    if (!this.#loanCoordinator) {
      this.#loanCoordinator = this.#contractFactory.create({
        address: this.#config.protocol.v3.coordinator.address,
        abi: this.#config.protocol.v3.coordinator.abi
      });
    }
    return this.#loanCoordinator;
  }

  get _refinanceContract() {
    if (!this.#refinanceContract) {
      this.#refinanceContract = this.#contractFactory.create({
        address: this.#config.protocol.v3.refinance.v1.address,
        abi: this.#config.protocol.v3.refinance.v1.abi
      });
    }
    return this.#refinanceContract;
  }

  async _getLoanData(options) {
    const loanData = await this._loanCoordinator.call({
      function: 'getLoanDataAndOfferType',
      args: [options.loan.id]
    });
    const loanContractAddress = loanData[0][0];
    return loanContractAddress;
  }

  async _getLatestLoanContract(type) {
    if (!this.#loanContract) {
      const loanContractAddress = await this._loanCoordinator.call({
        function: 'getDefaultLoanContractForOfferType',
        args: [this.#ethers.utils.formatBytes32String(type)]
      });
      this.#loanContract = this.#contractFactory.create({
        address: loanContractAddress,
        abi: this.#config.protocol.v3.assetOfferLoan.v1.abi
      });
    }
    return this.#loanContract;
  }

  async acceptOffer(options) {
    let success;
    try {
      const offer = {
        loanPrincipalAmount: String(options.offer.terms.loan.principal),
        maximumRepaymentAmount: String(options.offer.terms.loan.repayment),
        nftCollateralId: options.offer.nft.id,
        nftCollateralContract: options.offer.nft.address,
        loanDuration: options.offer.terms.loan.duration,
        loanERC20Denomination: options.offer.terms.loan.currency,
        isProRata: options.offer.terms.loan.interest.prorated,
        originationFee: String(options.offer.terms.loan.origination)
      };
      const signature = {
        signer: options.offer.lender.address,
        nonce: options.offer.lender.nonce,
        expiry: options.offer.terms.loan.expiry,
        signature: options.offer.signature
      };

      const loanContract = await this._getLatestLoanContract(this.#config.protocol.v3.type.asset.value);
      const result = await loanContract.call({
        function: 'acceptOffer',
        args: [offer, signature]
      });
      success = result?.status === 1;
    } catch (e) {
      success = false;
    }
    return success;
  }

  async payBackLoan(options) {
    let success;
    try {
      const loanContract = this.#contractFactory.create({
        address: options.loanContractAddress,
        abi: this.#config.protocol.v3.assetOfferLoan.v1.abi
      });
      const result = await loanContract.call({
        function: 'payBackLoan',
        args: [options.loan.id]
      });
      success = result?.status === 1;
    } catch (e) {
      success = false;
    }
    return success;
  }

  async liquidateOverdueLoan(options) {
    let success;
    try {
      const loanContract = this.#contractFactory.create({
        address: options.loanContractAddress,
        abi: this.#config.protocol.v3.assetOfferLoan.v1.abi
      });
      const result = await loanContract.call({
        function: 'liquidateOverdueLoan',
        args: [options.loan.id]
      });
      success = result?.status === 1;
    } catch (e) {
      success = false;
    }
    return success;
  }

  async refinanceLoan(options) {
    let success;
    try {
      const loanContractName = options.loan.nftfi.contract.name;
      let loanContractAddress;
      switch (loanContractName) {
        case this.#config.protocol.v3.assetOfferLoan.v1.name:
        case this.#config.protocol.v3.collectionOfferLoan.v1.name:
          loanContractAddress = await this._getLoanData(options);
          break;
        default:
          loanContractAddress = this.#config.getContractAddress(options.loan.nftfi.contract.name);
      }

      const refinancingData = {
        loanIdentifier: options.loan.id,
        refinanceableContract: loanContractAddress
      };
      const offer = {
        loanPrincipalAmount: String(options.offer.terms.loan.principal),
        maximumRepaymentAmount: String(options.offer.terms.loan.repayment),
        nftCollateralId: options.offer.nft.id,
        nftCollateralContract: options.offer.nft.address,
        loanDuration: options.offer.terms.loan.duration,
        loanERC20Denomination: options.offer.terms.loan.currency,
        isProRata: options.offer.terms.loan.interest.prorated,
        originationFee: String(options.offer.terms.loan.origination)
      };
      const signature = {
        signer: options.offer.lender.address,
        nonce: options.offer.lender.nonce,
        expiry: options.offer.terms.loan.expiry,
        signature: options.offer.signature
      };

      const result = await this._refinanceContract.call({
        function: 'refinanceLoan',
        args: [refinancingData, offer, signature]
      });
      success = result.status === 1;
    } catch (e) {
      success = false;
    }
    return success;
  }

  async mintObligationReceipt(options) {
    let success;
    try {
      const loanContract = this.#contractFactory.create({
        address: options.loanContractAddress,
        abi: this.#config.protocol.v3.assetOfferLoan.v1.abi
      });
      const result = await loanContract.call({
        function: 'mintObligationReceipt',
        args: [options.loan.id]
      });
      success = result?.status === 1;
    } catch (e) {
      success = false;
    }
    return success;
  }

  async mintPromissoryNote(options) {
    let success;
    try {
      const loanContract = this.#contractFactory.create({
        address: options.loanContractAddress,
        abi: this.#config.protocol.v3.assetOfferLoan.v1.abi
      });
      const result = await loanContract.call({
        function: 'mintPromissoryNote',
        args: [options.loan.id]
      });
      success = result?.status === 1;
    } catch (e) {
      success = false;
    }
    return success;
  }
}

export default LoansAssetOfferV1;
