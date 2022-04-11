/**
 * @class
 * Class for working with ERC20 tokens.
 */
class Erc20 {
  constructor(options) {
    this.config = options?.config;
    this.ethers = options?.ethers;
    this.account = options?.account;
    this.erc20Abi = [
      'function balanceOf(address owner) view returns (uint256)',
      'function approve(address spender, uint256 value) returns (bool)',
      'function allowance(address owner, address spender) public view returns (uint256)'
    ];
  }

  /**
   * Approves your account's ERC20 spending amount, if not already approved, for v1 & v2 NFTfi contracts.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.token.address - The ERC20 token address
   * @param {string} options.nftfi.contract.name - The name of the contract NFTfi contract (eg. `v1.loan.fixed`, `v2.loan.fixed`)
   * @param {number} options.amount - The token amount to approve, in base units (eg. 1000000000000000000 wei)
   * @returns {boolean} Boolean value indicating whether the operation succeeded
   *
   * @example
   * const results = await nftfi.erc20.approve({
   *   amount: 1000000000000000000,
   *   token: { address: '0x00000000' },
   *   nftfi: { contract: { name: 'v2.loan.fixed' } }
   * });
   */
  async approve(options) {
    const contractName = options.nftfi.contract.name;
    const amount = options.amount.toLocaleString('fullwide', { useGrouping: false });
    const signer = await this.account.signer();
    const contract = new this.ethers.Contract(options.token.address, this.erc20Abi, signer);
    let contractAddress;
    let success;
    switch (contractName) {
      case 'v1.loan.fixed':
        contractAddress = this.config.loan.fixed.v1.address;
        break;
      case 'v2.loan.fixed':
        contractAddress = this.config.loan.fixed.v2.address;
        break;
    }
    const allowance = await contract.allowance(this.account.address, contractAddress);
    if (allowance.lt(amount) || amount === '0') {
      success = await contract.approve(contractAddress, amount);
    } else {
      success = true;
    }
    return success;
  }

  /**
   * Returns your account's balance of a given ERC20 token.
   *
   * @param {object} options - Options
   * @param {string} options.token.address - The ERC20 token address
   * @returns {number} The user account's token balance, in base units (eg. 1000000000000000000 wei)
   *
   * @example
   * const balance = await nftfi.erc20.balanceOf({
   *   token: { address: '0x00000000' }
   * });
   */
  async balanceOf(options) {
    const signer = await this.account.signer();
    const contract = new this.ethers.Contract(options.token.address, this.erc20Abi, signer);
    const balance = await contract.balanceOf(this.account.address);
    return balance;
  }
}

module.exports = Erc20;
