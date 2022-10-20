/**
 * @class
 * Class for working with ERC20 tokens.
 */
class Erc20 {
  #config;
  #contractFactory;
  #account;
  #BN;

  constructor(options) {
    this.#config = options?.config;
    this.#contractFactory = options?.contractFactory;
    this.#account = options?.account;
    this.#BN = options?.BN;
  }

  _getContractAddress(contractName) {
    switch (contractName) {
      case 'v1.loan.fixed':
        return this.#config.loan.fixed.v1.address;
      case 'v2.loan.fixed':
        return this.#config.loan.fixed.v2.address;
      case 'v2-1.loan.fixed':
        return this.#config.loan.fixed.v2_1.address;
    }
  }

  /**
   * Returns your account's ERC20 allowance for v1 & v2 NFTfi contracts.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.token.address - The ERC20 token address
   * @param {string} options.nftfi.contract.name - The name of the contract NFTfi contract (eg. `v1.loan.fixed`, `v2.loan.fixed`, `v2-1.loan.fixed`)
   * @returns {number} The user account's token allowance for that contract, in base units (eg. 1000000000000000000 wei)
   *
   * @example
   * const balance = await nftfi.erc20.allowance({
   *  token: { address: '0x00000000' },
   *  nftfi: { contract: { name: 'v2-1.loan.fixed' } }
   * });
   */
  async allowance(options) {
    const contractName = options.nftfi.contract.name;
    const contractAddress = this._getContractAddress(contractName);

    const contract = this.#contractFactory.create({
      address: options.token.address,
      abi: this.#config.erc20.abi
    });
    return await contract.call({
      function: 'allowance',
      args: [this.#account.getAddress(), contractAddress]
    });
  }

  /**
   * Approves your account's ERC20 spending amount, if not already approved, for v1 & v2 NFTfi contracts.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.token.address - The ERC20 token address
   * @param {string} options.nftfi.contract.name - The name of the contract NFTfi contract (eg. `v1.loan.fixed`, `v2.loan.fixed`, `v2-1.loan.fixed`)
   * @param {number} options.amount - The token amount to approve, in base units (eg. 1000000000000000000 wei)
   * @returns {boolean} Boolean value indicating whether the operation succeeded
   *
   * @example
   * const results = await nftfi.erc20.approve({
   *   amount: 1000000000000000000,
   *   token: { address: '0x00000000' },
   *   nftfi: { contract: { name: 'v2-1.loan.fixed' } }
   * });
   */
  async approve(options) {
    const contractName = options.nftfi.contract.name;
    const contractAddress = this._getContractAddress(contractName);
    let success;

    const contract = this.#contractFactory.create({
      address: options.token.address,
      abi: this.#config.erc20.abi
    });

    const allowance = await this.allowance(options);
    const amount = options.amount.toLocaleString('fullwide', { useGrouping: false });

    if (allowance.lt(amount) || amount === '0') {
      const result = await contract.call({
        function: 'approve',
        args: [contractAddress, amount]
      });
      success = result?.status === 1;
    } else {
      success = true;
    }
    return success;
  }

  /**
   * Approves your account's ERC20 maximum amount, if not already approved, for v1 & v2 NFTfi contracts.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.token.address - The ERC20 token address
   * @param {string} options.nftfi.contract.name - The name of the contract NFTfi contract (eg. `v1.loan.fixed`, `v2.loan.fixed`, `v2-1.loan.fixed`)
   * @returns {boolean} Boolean value indicating whether the operation succeeded
   *
   * @example
   * const results = await nftfi.erc20.approveMax({
   *   token: { address: '0x00000000' },
   *   nftfi: { contract: { name: 'v2-1.loan.fixed' } }
   * });
   */
  async approveMax(options) {
    const maxAllowance = new this.#BN(0).notn(256).toString();
    return this.approve({ ...options, amount: maxAllowance });
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
    const contract = this.#contractFactory.create({
      address: options.token.address,
      abi: this.#config.erc20.abi
    });
    const balance = await contract.call({
      function: 'balanceOf',
      args: [this.#account.getAddress()]
    });
    return balance;
  }
}

export default Erc20;
