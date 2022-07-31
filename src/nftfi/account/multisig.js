class Multisig {
  #multisig;

  constructor(options) {
    this.#multisig = options?.multisig;
  }

  isMultisig() {
    return this.#multisig.isMultisig();
  }

  getAddress() {
    return this.#multisig.getAddress();
  }

  getAuthAddress() {
    return this.#multisig.getAuthAddress();
  }

  getSigner() {
    return this.#multisig.getSigner();
  }

  async sign(msg) {
    return this.#multisig.sign(msg);
  }

  async authSign(msg) {
    return this.#multisig.authSign(msg);
  }

  async execTransaction(tx) {
    return this.#multisig.execTransaction(tx);
  }
}

export default Multisig;
