class EOA {
  #address;
  #signer;
  #provider;

  constructor(options = {}) {
    this.#address = options?.address;
    this.#signer = options?.signer;
    this.#provider = options?.provider;
  }

  isMultisig() {
    return false;
  }

  getAddress() {
    return this.#address;
  }

  getAuthAddress() {
    return this.getAddress();
  }

  getSigner() {
    return this.#signer;
  }

  async sign(msg) {
    const signedMsg = this.#signer.signMessage(msg);
    return signedMsg;
  }

  async authSign(msg) {
    return this.sign(msg);
  }

  async execTransaction(tx) {
    const receipt = await this.#signer.sendTransaction(tx);
    const response = this.#provider.waitForTransaction(receipt.hash);
    return response;
  }
}

export default EOA;
