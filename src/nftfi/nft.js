export default class Nft {
  #config;
  #result;
  #erc721;
  #nftPunk;
  #ethers;

  constructor(options) {
    this.#config = options?.config;
    this.#result = options?.result;
    this.#erc721 = options?.erc721;
    this.#nftPunk = options?.nft?.punk;
    this.#ethers = options?.ethers;
  }

  async approve(options) {
    let success = false;
    const tokenAddress = this.#ethers.utils.getAddress(options?.token?.address);
    switch (tokenAddress) {
      case this.#config.nft.punk.address:
        success = await this.#nftPunk.approve(options);
        break;
      default:
        success = await this.#erc721.setApprovalForAll(options);
        break;
    }
    return this.#result.handle({ success });
  }

  async isApproved(options) {
    let approved = false;
    const tokenAddress = this.#ethers.utils.getAddress(options?.token?.address);
    switch (tokenAddress) {
      case this.#config.nft.punk.address:
        approved = await this.#nftPunk.isApproved(options);
        break;
      default:
        approved = await this.#erc721.isApprovedForAll(options);
        break;
    }
    return this.#result.handle({ approved });
  }

  async ownerOf(options) {
    const { token } = options;
    let ownerAddress;
    const tokenAddress = this.#ethers.utils.getAddress(token?.address);
    switch (tokenAddress) {
      case this.#config.nft.punk.address:
        ownerAddress = await this.#nftPunk.ownerOf({ token });
        break;
      default:
        ownerAddress = await this.#erc721.ownerOf({ token });
        break;
    }
    return this.#result.handle({ address: ownerAddress });
  }
}
