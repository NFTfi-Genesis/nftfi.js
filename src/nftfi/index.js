class NFTfi {
  config;
  account;
  listings;
  offers;
  loans;
  erc20;
  utils;

  constructor(options = {}) {
    this.config = options.config;
    this.account = options.account;
    this.listings = options.listings;
    this.offers = options.offers;
    this.loans = options.loans;
    this.erc20 = options.erc20;
    this.utils = options.utils;
  }
}

export default NFTfi;
