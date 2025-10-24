class EOA {
  #address;
  #signer;
  #provider;
  #config;

  constructor(options = {}) {
    this.#address = options?.address;
    this.#signer = options?.signer;
    this.#provider = options?.provider;
    this.#config = options?.config;
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

  async signTypedData(domain, types, value) {
    if (typeof this.#signer.signTypedData === 'function') {
      const signature = await this.#signer.signTypedData(domain, types, value);
      return signature;
    } else if (typeof this.#signer._signTypedData === 'function') {
      const signature = await this.#signer._signTypedData(domain, types, value);
      return signature;
    } else {
      throw new Error('Neither signTypedData nor _signTypedData method is available on the signer');
    }
  }

  async authSign(msg) {
    return this.sign(msg);
  }

  async execTransaction(tx) {
    const receipt = await this.#signer.sendTransaction(tx);
    const confirmations =
      typeof this.#config.ethereum.block.confirmations === 'number' ? this.#config.ethereum.block.confirmations : null;
    return this.#provider.waitForTransaction(receipt.hash, confirmations);
  }
}

export default EOA;
