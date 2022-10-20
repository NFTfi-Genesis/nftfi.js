class LoansFixedV2 {
  #config;
  #contractFactory;
  #contract;

  constructor(options) {
    this.#config = options?.config;
    this.#contractFactory = options?.contractFactory;
    this.#contract = this.#contractFactory.create({
      address: this.#config.loan.fixed.v2.address,
      abi: this.#config.loan.fixed.v2.abi
    });
  }

  async liquidateOverdueLoan(options) {
    let success;
    try {
      const result = await this.#contract.call({
        function: 'liquidateOverdueLoan',
        args: [options.loan.id]
      });
      success = result?.status === 1 ? true : false;
    } catch (e) {
      success = false;
    }
    return success;
  }

  async payBackLoan(options) {
    let success;
    try {
      const result = await this.#contract.call({
        function: 'payBackLoan',
        args: [options.loan.id]
      });
      success = result?.status === 1 ? true : false;
    } catch (e) {
      success = false;
    }
    return success;
  }

  async cancelLoanCommitmentBeforeLoanHasBegun(options) {
    let success;
    try {
      const result = await this.#contract.call({
        function: 'cancelLoanCommitmentBeforeLoanHasBegun',
        args: [options.offer.nonce]
      });
      success = result?.status === 1 ? true : false;
    } catch (e) {
      success = false;
    }
    return success;
  }
}

export default LoansFixedV2;
