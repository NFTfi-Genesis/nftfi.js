class LoanFixedV2 {
  constructor(options) {
    this.account = options?.account;
    this.ethers = options?.ethers;
    this.config = options?.config;
    this.abi = ['function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()'];
  }
  async liquidate(options) {
    let result = true;
    try {
      const signer = await this.account.signer();
      const contract = new this.ethers.Contract(this.config.loan.fixed.v2.address, this.abi, signer);
      await contract.liquidateOverdueLoan(options.loan.id);
    } catch (e) {
      result = false;
    }
    return result;
  }
}

module.exports = LoanFixedV2;
