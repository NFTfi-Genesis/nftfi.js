class UtilsArcade {
  #config;
  #contractFactory;
  #result;
  #error;

  constructor(options = {}) {
    this.#config = options?.config;
    this.#contractFactory = options?.contractFactory;
    this.#result = options?.result;
    this.#error = options?.error;
  }

  async getLoanData(options) {
    try {
      const arcadeLoanCoreContract = this.#contractFactory.create({
        address: this.#config.protocol.arcade.loan.core.address,
        abi: this.#config.protocol.arcade.loan.core.abi
      });
      const loanData = await arcadeLoanCoreContract.call({
        function: 'getLoan',
        args: [options.loan.id]
      });
      const loanCurrency = loanData[2][5];
      const loanActive = loanData[0] === 1 ? 'active' : null;
      return this.#result.handle({
        status: loanActive,
        date: { started: loanData[1], due: Number(loanData[1]) + Number(loanData[2][3]) },
        nft: { id: loanData[2][4]?.toString(), address: loanData[2][2] },
        terms: {
          loan: {
            currency: loanCurrency.toLowerCase(),
            principal: loanData[2][1].toString(),
            duration: loanData[2][3].toString(),
            interest: loanData[2][0].toString()
          }
        }
      });
    } catch (e) {
      return this.#error.handle(e, null, options);
    }
  }
}

export default UtilsArcade;
