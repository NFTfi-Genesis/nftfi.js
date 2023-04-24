class NFTfi {
  config;
  account;
  listings;
  offers;
  loans;
  erc20;
  erc721;
  bundles;
  immutables;
  utils;
  events;
  rewards;

  constructor(options = {}) {
    this.config = options.config;
    this.account = options.account;
    this.listings = options.listings;
    this.offers = options.offers;
    this.loans = options.loans;
    this.erc20 = options.erc20;
    this.erc721 = options.erc721;
    this.bundles = options?.bundles;
    this.immutables = options?.immutables;
    this.utils = options.utils;
    this.events = options.events;
    this.rewards = options.rewards;
  }
}

export default NFTfi;
