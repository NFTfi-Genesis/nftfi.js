class LoansFixedV1 {
  #config;
  #contractFactory;
  #contract;

  constructor(options) {
    this.#config = options?.config;
    this.#contractFactory = options?.contractFactory;
  }

  get _contract() {
    if (!this.#contract) {
      this.#contract = this.#contractFactory.create({
        address: this.#config.loan.fixed.v1.address,
        abi: this.#config.loan.fixed.v1.abi
      });
    }
    return this.#contract;
  }

  async liquidateOverdueLoan(options) {
    let success;
    try {
      const result = await this._contract.call({
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
      const result = await this._contract.call({
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
      const result = await this._contract.call({
        function: 'cancelLoanCommitmentBeforeLoanHasBegun',
        args: [options.offer.nonce]
      });
      success = result?.status === 1;
    } catch (e) {
      success = false;
    }
    return success;
  }
}

export default LoansFixedV1;
