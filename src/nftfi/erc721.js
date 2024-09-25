/**
 * @class
 * Class for working with ERC721 non-fungible tokens.
 */
class Erc721 {
  #config;
  #contractFactory;
  #account;
  #assertion;
  #error;

  constructor(options) {
    this.#config = options?.config;
    this.#contractFactory = options?.contractFactory;
    this.#account = options?.account;
    this.#assertion = options?.assertion;
    this.#error = options?.error;
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
      case 'v1-1.bundler':
        return this.#config.bundler.v1_1.address;
      case 'v2.loan.fixed.collection':
        return this.#config.loan.fixed.collection.v2.address;
      case 'v2-3.loan.fixed.collection':
        return this.#config.loan.fixed.collection.v2_3.address;
      case 'v1.bundler.migrate':
        return this.#config.bundler.migrate.v1.address;
      case 'loan.refinance':
        return this.#config.loan.refinance.address;
      case 'v3.refinance.v1':
        return this.#config.protocol.v3.refinance.v1.address;
      case 'v3.escrow.v1':
        return this.#config.protocol.v3.escrow.v1.address;
    }
  }

  /**
   * Returns the owner of the specified NFT.
   *
   * @param {object} options - Options
   * @param {string} options.token.address - The ERC721 token address
   * @param {string} options.token.id - The ERC721 token ID
   * @returns {string} The NFT's owner address
   *
   * @example
   * const address = await nftfi.nft.erc721.ownerOf({
   *   token: {
   *    address: '0x00000000',
   *    id: '0'
   *   }
   * });
   */
  async ownerOf(options) {
    try {
      const contract = this.#contractFactory.create({
        address: options.token.address,
        abi: this.#config.erc721.abi
      });
      const address = await contract.call({
        function: 'ownerOf',
        args: [options.token.id]
      });
      return address.toLowerCase();
    } catch (e) {
      if (options?.rethrow) throw e;
      return this.#error.handle(e);
    }
  }

  /**
   * Sets the approval of a given NFTfi contract.
   * The NFTfi contract is allowed to transfer all tokens of the sender on their behalf.
   *
   * @param {object} options - Options
   * @param {string} options.token.address - The ERC721 token address
   * @param {string} options.nftfi.contract.name - The name of the NFTfi contract (eg. `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`)
   * @returns {boolean} Boolean value indicating whether the operation succeeded
   *
   * @example
   * const address = await nftfi.nft.erc721.setApprovalForAll({
   *   token: {
   *    address: '0x00000000'
   *   },
   *   nftfi: { contract: { name: 'v2-3.loan.fixed' } }
   * });
   */
  async setApprovalForAll(options) {
    try {
      this.#assertion.hasSigner();
      let success;
      const contractName = options.nftfi.contract.name;
      const contractAddress = this._getContractAddress(contractName);
      const contract = this.#contractFactory.create({
        address: options.token.address,
        abi: this.#config.erc721.abi
      });
      const result = await contract.call({
        function: 'setApprovalForAll',
        args: [contractAddress, true]
      });
      success = result?.status === 1;
      return success;
    } catch (e) {
      if (options?.rethrow) throw e;
      return this.#error.handle(e);
    }
  }

  /**
   * Returns the approval of a given NFTfi contract.
   * The NFTfi contract is allowed to transfer all tokens of the sender on their behalf.
   *
   * @param {object} options - Options
   * @param {object} options.account.address - The account address to get the approval of (optional)
   * @param {string} options.token.address - The ERC721 token address
   * @param {string} options.nftfi.contract.name - The name of the NFTfi contract (eg. `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`)
   * @returns {boolean} Boolean value indicating whether permission has been granted or not
   *
   * @example
   * const address = await nftfi.nft.erc721.isApprovedForAll({
   *   token: {
   *    address: '0x00000000'
   *   },
   *   nftfi: { contract: { name: 'v2-3.loan.fixed' } }
   * });
   */
  async isApprovedForAll(options) {
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
        abi: this.#config.erc721.abi
      });
      const result = await contract.call({
        function: 'isApprovedForAll',
        args: [accountAddress, contractAddress]
      });

      return result;
    } catch (e) {
      if (options?.rethrow) throw e;
      return this.#error.handle(e);
    }
  }
}

export default Erc721;
