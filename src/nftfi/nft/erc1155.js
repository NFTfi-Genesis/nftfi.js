/**
 * @class
 * Class for working with ERC1155 multi token standard.
 */
class Erc1155 {
  #config;
  #contractFactory;
  #account;

  constructor(options) {
    this.#config = options?.config;
    this.#contractFactory = options?.contractFactory;
    this.#account = options?.account;
  }

  _getContractAddress(contractName) {
    switch (contractName) {
      case 'v1.loan.fixed':
        return this.#config.loan.fixed.v1.address;
      case 'v2.loan.fixed':
        return this.#config.loan.fixed.v2.address;
      case 'v2-1.loan.fixed':
        return this.#config.loan.fixed.v2_1.address;
      case 'v2.loan.fixed.collection':
        return this.#config.loan.fixed.collection.v2.address;
    }
  }

  /**
   * Sets the approval of a given NFTfi contract.
   * The NFTfi contract is allowed to transfer all tokens of the sender on their behalf.
   *
   * @param {object} options - Options
   * @param {string} options.token.address - The ERC1155 token address
   * @param {string} options.nftfi.contract.name - The name of the NFTfi contract (eg. `v1.loan.fixed`, `v2.loan.fixed`, `v2-1.loan.fixed`)
   * @returns {boolean} Boolean value indicating whether the operation succeeded
   *
   * @example
   * const address = await nftfi.nft.erc1155.setApprovalForAll({
   *   token: {
   *    address: '0x00000000'
   *   },
   *   nftfi: { contract: { name: 'v2-1.loan.fixed' } }
   * });
   */
  async setApprovalForAll(options) {
    let success;
    const contractName = options.nftfi.contract.name;
    const contractAddress = this._getContractAddress(contractName);
    const contract = this.#contractFactory.create({
      address: options.token.address,
      abi: this.#config.erc1155.abi
    });
    const result = await contract.call({
      function: 'setApprovalForAll',
      args: [contractAddress, true]
    });
    success = result?.status === 1;
    return success;
  }

  /**
   * Returns the approval of a given NFTfi contract.
   * The NFTfi contract is allowed to transfer all tokens of the sender on their behalf.
   *
   * @param {object} options - Options
   * @param {string} options.token.address - The ERC1155 token address
   * @param {string} options.nftfi.contract.name - The name of the NFTfi contract (eg. `v1.loan.fixed`, `v2.loan.fixed`, `v2-1.loan.fixed`)
   * @returns {boolean} Boolean value indicating whether permission has been granted or not
   *
   * @example
   * const address = await nftfi.nft.erc1155.isApprovalForAll({
   *   token: {
   *    address: '0x00000000'
   *   },
   *   nftfi: { contract: { name: 'v2-1.loan.fixed' } }
   * });
   */
  async isApprovedForAll(options) {
    const contractName = options.nftfi.contract.name;
    const contractAddress = this._getContractAddress(contractName);
    const accountAddress = options?.account?.address || this.#account.getAddress();
    const contract = this.#contractFactory.create({
      address: options.token.address,
      abi: this.#config.erc1155.abi
    });
    const result = await contract.call({
      function: 'isApprovedForAll',
      args: [accountAddress, contractAddress]
    });

    return result;
  }

  /**
   * Returns the balance of a given ERC1155 token
   *
   * @param {object} options - Options
   * @param {string} options.token.address - The ERC1155 token address
   * @param {string} options.token.id - The ERC1155 token id
   * @param {string} [options.account.address] - The address of the account (If not provided, the signer account address will be used.)
   * @returns {number} The balance of tokens owned by account.
   *
   * @example
   * const balance = await nftfi.nft.balanceOf({
   *   token: {
   *    address: '0x00000000',
   *    id: '0'
   *   }
   * });
   *
   * @example
   * const balance = await nftfi.nft.balanceOf({
   *   token: {
   *    address: '0x00000000',
   *    id: '0'
   *   },
   *   account: {
   *    address: "0x111111111"
   *   }
   * });
   */
  async balanceOf(options) {
    const accountAddress = options?.account?.address || this.#account.getAddress();
    const tokenId = options?.token?.id;
    const contract = this.#contractFactory.create({
      address: options.token.address,
      abi: this.#config.erc1155.abi
    });
    const result = await contract.call({
      function: 'balanceOf',
      args: [accountAddress, tokenId]
    });
    return result;
  }
}

export default Erc1155;
