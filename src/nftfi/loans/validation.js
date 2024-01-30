class LoansValidation {
  #refinance;

  constructor(options = {}) {
    this.#refinance = options?.refinance;
  }

  get refinance() {
    return this.#refinance;
  }
}

export default LoansValidation;
