class LoansFixedCollectionV2 {
  #config;
  #contractFactory;
  #loanContract;
  #refinanceContract;

  constructor(options) {
    this.#config = options?.config;
    this.#contractFactory = options?.contractFactory;
  }

  get _loanContract() {
    if (!this.#loanContract) {
      this.#loanContract = this.#contractFactory.create({
        address: this.#config.loan.fixed.collection.v2.address,
        abi: this.#config.loan.fixed.collection.v2.abi
      });
    }
    return this.#loanContract;
  }

  get _refinanceContract() {
    if (!this.#refinanceContract) {
      this.#refinanceContract = this.#contractFactory.create({
        address: this.#config.loan.refinance.address,
        abi: this.#config.loan.refinance.abi
      });
    }
    return this.#refinanceContract;
  }

  async liquidateOverdueLoan(options) {
    let success;
    try {
      const result = await this._loanContract.call({
        function: 'liquidateOverdueLoan',
        args: [options.loan.id]
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
      const result = await this._loanContract.call({
        function: 'payBackLoan',
        args: [options.loan.id]
      });
      success = result?.status === 1;
    } catch (e) {
      success = false;
    }
    return success;
  }

  async cancelLoanCommitmentBeforeLoanHasBegun(options) {
    let success;
    try {
      const result = await this._loanContract.call({
        function: 'cancelLoanCommitmentBeforeLoanHasBegun',
        args: [options.offer.nonce]
      });
      success = result?.status === 1;
    } catch (e) {
      success = false;
    }
    return success;
  }

  async mintObligationReceipt(options) {
    let success;
    try {
      const result = await this._loanContract.call({
        function: 'mintObligationReceipt',
        args: [options.loan.id]
      });
      success = result?.status === 1;
    } catch (e) {
      success = false;
    }
    return success;
  }

  async refinanceCollectionOfferLoan(options) {
    let success;
    try {
      const refinanceableContract = this.#config.getContractAddress(options.loan.nftfi.contract.name);
      const refinancingData = {
        loanIdentifier: options.loan.id,
        refinanceableContract
      };
      const offer = {
        loanERC20Denomination: options.offer.terms.loan.currency,
        loanPrincipalAmount: options.offer.terms.loan.principal.toLocaleString('fullwide', { useGrouping: false }),
        maximumRepaymentAmount: options.offer.terms.loan.repayment.toLocaleString('fullwide', { useGrouping: false }),
        nftCollateralContract: options.offer.nft.address,
        nftCollateralId: options.offer.nft.id,
        referrer: '0x0000000000000000000000000000000000000000',
        loanDuration: options.offer.terms.loan.duration,
        loanAdminFeeInBasisPoints: options.offer.nftfi.fee.bps
      };
      const signature = {
        signer: options.offer.lender.address,
        nonce: options.offer.lender.nonce,
        expiry: options.offer.terms.loan.expiry,
        signature: options.offer.signature
      };
      const borrowerSettings = {
        revenueSharePartner: '0x0000000000000000000000000000000000000000',
        referralFeeInBasisPoints: 0
      };
      const result = await this._refinanceContract.call({
        function: 'refinanceCollectionOfferLoan',
        args: [refinancingData, offer, signature, borrowerSettings]
      });
      success = result.status === 1;
    } catch (e) {
      success = false;
    }
    return success;
  }
}

export default LoansFixedCollectionV2;
