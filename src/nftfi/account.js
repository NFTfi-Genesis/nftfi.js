class Account {
  constructor(options = {}) {
    this.address = options?.address;
    this.ethers = options?.ethers;
  }
  async signer() {
    const signer = await this.ethers.getSigner(this?.address);
    return signer;
  }
  async sign(msg) {
    const signer = await this.signer();
    const signedMsg = signer.signMessage(msg);
    return signedMsg;
  }
}

module.exports = Account;
