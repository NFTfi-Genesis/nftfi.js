class Account {
  #address;
  #signer;

  constructor(options = {}) {
    this.#address = options?.address?.toLowerCase();
    this.#signer = options?.signer;
  }

  getAddress() {
    return this.#address;
  }

  getSigner() {
    return this.#signer;
  }

  async sign(msg) {
    const signedMsg = this.#signer.signMessage(msg);
    return signedMsg;
  }
}
export default Account;
