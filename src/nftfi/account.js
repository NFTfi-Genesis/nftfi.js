class Account {
  #account;

  constructor(options = {}) {
    this.#account = options?.account;
  }

  isMultisig() {
    return this.#account.isMultisig() || {};
  }

  getAddress() {
    return this.#account.getAddress();
  }

  getAuthAddress() {
    return this.#account.getAuthAddress();
  }

  getSigner() {
    return this.#account.getSigner();
  }

  async sign(msg) {
    const signedMsg = this.#account.sign(msg);
    return signedMsg;
  }

  async signTypedData(domain, types, value) {
    const signedMsg = this.#account.signTypedData(domain, types, value);
    return signedMsg;
  }

  async authSign(msg) {
    const signedMsg = this.#account.authSign(msg);
    return signedMsg;
  }

  async execTransaction(tx) {
    return this.#account.execTransaction(tx);
  }
}

export default Account;
