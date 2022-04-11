class NFTfi {
  constructor(options = {}) {
    this.config = options?.config;
    this.account = options?.account;
    this.listings = options?.listings;
    this.offers = options?.offers;
    this.loans = options?.loans;
    this.erc20 = options?.erc20;
    this.utils = options?.utils;
  }
}

module.exports = NFTfi;
