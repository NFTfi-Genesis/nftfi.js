export default class Nft {
  erc721;
  erc1155;
  cryptoPunks;
  #config;
  #result;
  #ethers;
  #utils;
  #account;
  #error;
  #assertion;

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
    this.#error = options?.error;
    this.#assertion = options?.assertion;
  }

  async approve(options) {
    try {
      this.#assertion.hasSigner();
      let success = false;
      const tokenAddress = this.#ethers.utils.getAddress(options?.token?.address);
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
              success = await this.erc721.setApprovalForAll({ ...options, rethrow: true });
              break;
            default:
              throw 'specified contract is not supported';
          }
        }
      }
      return this.#result.handle({ success });
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  async isApproved(options) {
    try {
      if (!options?.account?.address) {
        this.#assertion.hasAddress(
          'Account address required, please provide a value in options.account.address or on sdk initialization.'
        );
      }
      let approved = false;
      const tokenAddress = this.#ethers.utils.getAddress(options?.token?.address);
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
              approved = await this.erc721.isApprovedForAll({ ...options, rethrow: true });
              break;
            default:
              throw 'specified contract is not supported';
          }
        }
      }
      return this.#result.handle({ approved });
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  async owner(options) {
    try {
      let ownerAddress;
      const { token } = options;
      const tokenAddress = this.#ethers.utils.getAddress(token?.address);
      switch (tokenAddress) {
        case this.#config.nft.cryptoPunks.address:
          ownerAddress = await this.cryptoPunks.ownerOf({ token });
          break;
        default: {
          const supportedInterface = await this.#utils.getSupportedInterface(options);
          switch (true) {
            case supportedInterface.isERC721:
              ownerAddress = await this.erc721.ownerOf({ ...options, rethrow: true });
              break;
            default:
              throw 'specified contract is not supported';
          }
        }
      }
      return this.#result.handle({ address: ownerAddress });
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  async isOwner(options) {
    try {
      if (!options?.account?.address) {
        this.#assertion.hasAddress(
          'Account address required, please provide a value in options.account.address or on sdk initialization.'
        );
      }
      let balance;
      let ownerAddress;
      let result;
      const tokenAddress = this.#ethers.utils.getAddress(options?.token?.address);
      const accountAddress = options?.account?.address
        ? this.#ethers.utils.getAddress(options.account.address)
        : this.#account.getAddress();

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
              ownerAddress = await this.erc721.ownerOf({ ...options, rethrow: true });
              result = this.#ethers.utils.getAddress(ownerAddress) === accountAddress;
              break;
            default:
              throw 'specified contract is not supported';
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
          throw 'specified contract is not supported';
      }
      return this.#result.handle({ result: balance });
    } catch (e) {
      return this.#error.handle(e);
    }
  }
}
