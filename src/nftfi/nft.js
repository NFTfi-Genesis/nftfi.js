export default class Nft {
  erc721;
  erc1155;
  cryptoPunks;
  #config;
  #result;
  #ethers;
  #error;
  #utils;
  #account;

  constructor(options) {
    this.#config = options?.config;
    this.#result = options?.result;
    this.erc721 = options?.nft?.erc721;
    this.erc1155 = options?.nft?.erc1155;
    this.cryptoPunks = options?.nft?.cryptoPunks;
    this.#ethers = options?.ethers;
    this.#error = options?.error;
    this.#utils = options?.utils;
    this.#account = options?.account;
  }

  async approve(options) {
    let success = false;
    const tokenAddress = this.#ethers.utils.getAddress(options?.token?.address);
    try {
      switch (tokenAddress) {
        case this.#config.nft.cryptoPunks.address:
          success = await this.cryptoPunks.approve(options);
          break;
        default: {
          const supportedInterface = await this.#utils.getSupportedInterface(options);
          switch (true) {
            case supportedInterface.isERC1155:
              success = await this.erc1155.setApprovalForAll(options);
              break;
            case supportedInterface.isERC721:
              success = await this.erc721.setApprovalForAll(options);
              break;
            default:
              throw 'approve: only ERC1155, ERC721 & CRYPTOPUNK contracts are supported';
          }
        }
      }
      return this.#result.handle({ success });
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  async isApproved(options) {
    let approved = false;
    const tokenAddress = this.#ethers.utils.getAddress(options?.token?.address);
    try {
      switch (tokenAddress) {
        case this.#config.nft.cryptoPunks.address:
          approved = await this.cryptoPunks.isApproved(options);
          break;
        default: {
          const supportedInterface = await this.#utils.getSupportedInterface(options);
          switch (true) {
            case supportedInterface.isERC1155:
              approved = await this.erc1155.isApprovedForAll(options);
              break;
            case supportedInterface.isERC721:
              approved = await this.erc721.isApprovedForAll(options);
              break;
            default:
              throw 'isApproved: only ERC1155, ERC721 & CRYPTOPUNK contracts are supported';
          }
        }
      }
      return this.#result.handle({ approved });
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  async owner(options) {
    let ownerAddress;
    const { token } = options;
    const tokenAddress = this.#ethers.utils.getAddress(token?.address);
    try {
      switch (tokenAddress) {
        case this.#config.nft.cryptoPunks.address:
          ownerAddress = await this.cryptoPunks.ownerOf({ token });
          break;
        default: {
          const supportedInterface = await this.#utils.getSupportedInterface(options);
          switch (true) {
            case supportedInterface.isERC1155:
              throw 'owner: not supported by ERC1155 contract';
            case supportedInterface.isERC721:
              ownerAddress = await this.erc721.ownerOf({ token });
              break;
            default:
              throw 'owner: only ERC721 & CRYPTOPUNK contracts are supported';
          }
        }
      }
      return this.#result.handle({ address: ownerAddress });
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  async isOwner(options) {
    let balance;
    let ownerAddress;
    let result;
    const tokenAddress = this.#ethers.utils.getAddress(options?.token?.address);
    const accountAddress = options?.account?.address
      ? this.#ethers.utils.getAddress(options.account.address)
      : this.#account.getAddress();

    try {
      switch (tokenAddress) {
        case this.#config.nft.cryptoPunks.address:
          ownerAddress = await this.cryptoPunks.ownerOf(options);
          result = ownerAddress === accountAddress;
          break;
        default: {
          const supportedInterface = await this.#utils.getSupportedInterface(options);
          switch (true) {
            case supportedInterface.isERC1155:
              balance = await this.erc1155.balanceOf(options);
              result = balance > 0;
              break;
            case supportedInterface.isERC721:
              ownerAddress = await this.erc721.ownerOf(options);
              result = this.#ethers.utils.getAddress(ownerAddress) === accountAddress;
              break;
            default:
              throw 'isOwner: only ERC1155, ERC721 & CRYPTOPUNK contracts are supported';
          }
        }
      }
      return this.#result.handle({ result });
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  async balance(options) {
    let balance;
    try {
      const supportedInterface = await this.#utils.getSupportedInterface(options);
      switch (true) {
        case supportedInterface.isERC1155:
          balance = await this.erc1155.balanceOf(options);
          break;
        default:
          throw 'balance: only ERC1155 contracts are supported';
      }
      return this.#result.handle({ result: balance });
    } catch (e) {
      return this.#error.handle(e);
    }
  }
}
