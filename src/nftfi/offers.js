/**
 * @class
 * Class for working with offers.
 */
class Offers {
  constructor(options = {}) {
    this.account = options?.account;
    this.api = options?.api;
    this.config = options?.config;
    this.helper = options?.offersHelper;
  }

  /**
   * When called with no argument, gets all offers made by your account.
   * When provided with filters, gets all offers by specified filters.
   *
   * @param {object} [options] - Hashmap of config options for this method
   * @param {string} [options.filters.nft.address] - NFT contract address to filter by (optional)
   * @param {string} [options.filters.nft.id] - NFT id of the asset to filter by (optional)
   * @returns {Array<object>} Array of offers
   *
   * @example
   * // Get all offers made by your account
   * const offers = await nftfi.offers.get();
   *
   * @example
   * // Get all offers associated with a NFT
   * const offers = await nftfi.offers.get({
   *   filters: {
   *     nft: {
   *       address: "0x00000000",
   *       id: "42"
   *     }
   *   }
   * });
   */
  async get(options = {}) {
    let params = {};
    if (options?.filters?.nft) {
      params = {
        nftAddress: options.filters.nft.address,
        nftId: options.filters.nft.id
      };
    } else {
      params = {
        lenderAddress: this.account.address
      };
    }
    let response = await this.api.get({
      uri: 'offers',
      params
    });
    const offers = response['results'];
    return offers;
  }

  /**
   * Creates a new offer on a collateral listing.
   *
   * @param {object} options - Config options for this method
   * @param {object} options.terms - Terms of the offer
   * @param {object} options.listing - Listing to place an offer on
   * @returns {object} Response object
   *
   * @example
   * // Construct the loan terms
   * const currency = nftfi.config.erc20.weth.address;
   * const principal = 1000000000000000000; // 1 wETH
   * const apr = 32;
   * const days = 30;
   * const repayment = nftfi.utils.calcRepaymentAmount(principal, apr, days);
   * const duration = 86400 * days; // Number of days in seconds
   * const terms = {
   *   principal,
   *   repayment,
   *   duration,
   *   currency
   * };
   * // Get first available listing (to make offer on)
   * const listings = await nftfi.listings.get();
   * const listing = listings[0];
   * // Approve principal wETH with the NFTfi contract
   * await nftfi.erc20.approve({
   *   token: { address: currency },
   *   amount: principal,
   *   nftfi: {
   *     contract: {
   *       name: listing.nftfi.contract.name
   *     }
   *   }
   * });
   * // Create an offer on the listing
   * const offer = await nftfi.offers.create({
   *   terms,
   *   listing: {
   *     nft: {
   *       id: listing.nft.id,
   *       address: listing.nft.address
   *     }
   *     borrower: {
   *       address: listing.borrower.address
   *     },
   *     nftfi: {
   *       contract: {
   *         name: listing.nftfi.contract.name
   *       }
   *     }
   *   }
   * });
   */
  async create(options) {
    let payload = {};
    const contractName = options.listing.nftfi.contract.name;
    switch (contractName) {
      case 'v1.loan.fixed':
        payload = await this.helper.constructV1Offer(options);
        break;
      case 'v2.loan.fixed':
        payload = await this.helper.constructV2Offer(options);
        break;
    }
    const response = await this.api.post({
      uri: 'offers',
      payload
    });
    return response;
  }

  /**
   * Deletes an active offer made by your account.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {object} options.offer.id - The Id of the offer to be deleted
   * @returns {object} Response object
   *
   * @example
   * // Get first avilable offer made by your account
   * const offers = await nftfi.offers.get();
   * const offerId = offers[0]['id'];
   * // Delete the offer by Id
   * const deleted = await nftfi.offers.delete({
   *   offer: {
   *     id: offerId
   *   }
   * });
   */
  async delete(options) {
    const uri = `offers/${options.offer.id}`;
    const result = await this.api.delete({ uri });
    return result;
  }
}

module.exports = Offers;
