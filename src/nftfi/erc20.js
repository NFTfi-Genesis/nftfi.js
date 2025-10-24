/**
 * @class
 * Class for working with ERC20 tokens.
 */
class Erc20 {
  #config;
  #contractFactory;
  #account;
  #BN;
  #error;
  #assertion;

  constructor(options) {
    this.#config = options?.config;
    this.#contractFactory = options?.contractFactory;
    this.#account = options?.account;
    this.#BN = options?.BN;
    this.#error = options?.error;
    this.#assertion = options?.assertion;
  }

  _getContractAddress(contractName) {
    switch (contractName) {
      case 'v1.loan.fixed':
        return this.#config.loan.fixed.v1.address;
      case 'v2.loan.fixed':
        return this.#config.loan.fixed.v2.address;
      case 'v2-1.loan.fixed':
        return this.#config.loan.fixed.v2_1.address;
      case 'v2-3.loan.fixed':
        return this.#config.loan.fixed.v2_3.address;
      case 'v1.bundler':
        return this.#config.bundler.v1.address;
      case 'v2.loan.fixed.collection':
        return this.#config.loan.fixed.collection.v2.address;
      case 'v2-3.loan.fixed.collection':
        return this.#config.loan.fixed.collection.v2_3.address;
      case 'loan.refinance':
        return this.#config.loan.refinance.address;
      case 'v3.refinance.v1':
        return this.#config.protocol.v3.refinance.v1.address;
      case 'v3.erc20Manager.v1':
        return this.#config.protocol.v3.erc20Manager.v1.address;
      default:
        return this.#config.getContractAddress(contractName);
    }
  }

  /**
   * Returns the ERC20 allowance, for v1 & v2 NFTfi contracts, for your account (by default), or a specified account.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {object} [options.account.address] - The account address to get the allowance of (optional)
   * @param {string} options.token.address - The ERC20 token address
   * @param {string} options.nftfi.contract.name - The name of the contract NFTfi contract (eg. `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`)
   * @returns {number} The user account's token allowance for that contract, in base units (eg. 1000000000000000000 wei)
   *
   * @example
   * const balance = await nftfi.erc20.allowance({
   *  token: { address: '0x00000000' },
   *  nftfi: { contract: { name: 'v2-3.loan.fixed' } }
   * });
   */
  async allowance(options) {
    try {
      if (!options?.account?.address) {
        this.#assertion.hasAddress(
          'Account address required, please provide a value in options.account.address or on sdk initialization.'
        );
      }
      const contractName = options.nftfi.contract.name;
      const contractAddress = this._getContractAddress(contractName);
      const accountAddress = options?.account?.address || this.#account.getAddress();

      const contract = this.#contractFactory.create({
        address: options.token.address,
        abi: this.#config.erc20.abi
      });
      return await contract.call({
        function: 'allowance',
        args: [accountAddress, contractAddress]
      });
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Approves your account's ERC20 spending amount, if not already approved, for v1 & v2 NFTfi contracts.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.token.address - The ERC20 token address
   * @param {string} options.nftfi.contract.name - The name of the contract NFTfi contract (eg. `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`)
   * @param {number} options.amount - The token amount to approve, in base units (eg. 1000000000000000000 wei)
   * @returns {boolean} Boolean value indicating whether the operation succeeded
   *
   * @example
   * const results = await nftfi.erc20.approve({
   *   amount: 1000000000000000000,
   *   token: { address: '0x00000000' },
   *   nftfi: { contract: { name: 'v2-3.loan.fixed' } }
   * });
   */
  async approve(options) {
    try {
      this.#assertion.hasAddress();
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
        this.#assertion.hasSigner();
        const result = await contract.call({
          function: 'approve',
          args: [contractAddress, amount]
        });
        success = result?.status === 1;
      } else {
        success = true;
      }
      return success;
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Approves your account's ERC20 maximum amount, if not already approved, for v1 & v2 NFTfi contracts.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.token.address - The ERC20 token address
   * @param {string} options.nftfi.contract.name - The name of the contract NFTfi contract (eg. `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`)
   * @returns {boolean} Boolean value indicating whether the operation succeeded
   *
   * @example
   * const results = await nftfi.erc20.approveMax({
   *   token: { address: '0x00000000' },
   *   nftfi: { contract: { name: 'v2-3.loan.fixed' } }
   * });
   */
  async approveMax(options) {
    const maxAllowance = new this.#BN(0).notn(256).toString();
    return this.approve({ ...options, amount: maxAllowance });
  }

  /**
   * Returns the balance of a given ERC20 token for your account (by default), or a specified account.
   *
   * @param {object} options - Options
   * @param {object} [options.account.address] - The account address to get the balance of (optional)
   * @param {string} options.token.address - The ERC20 token address
   * @returns {number} The user account's token balance, in base units (eg. 1000000000000000000 wei)
   *
   * @example
   * const balance = await nftfi.erc20.balanceOf({
   *   token: { address: '0x00000000' }
   * });
   */
  async balanceOf(options) {
    try {
      if (!options?.account?.address) {
        this.#assertion.hasAddress(
          'Account address required, please provide a value in options.account.address or on sdk initialization.'
        );
      }
      const contract = this.#contractFactory.create({
        address: options.token.address,
        abi: this.#config.erc20.abi
      });
      const accountAddress = options?.account?.address || this.#account.getAddress();
      const balance = await contract.call({ function: 'balanceOf', args: [accountAddress] });
      return balance;
    } catch (e) {
      return this.#error.handle(e);
    }
  }
}

export default Erc20;
