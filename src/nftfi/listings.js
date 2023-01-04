/**
 * @class
 * Class for working with listings.
 */
class Listings {
  #api;
  #config;
  #helper;

  constructor(options = {}) {
    this.#api = options?.api;
    this.#config = options?.config;
    this.#helper = options?.helper;
  }

  /**
   * Gets all current listings.
   *
   * @param {object} [options] - Hashmap of config options for this method
   * @param {Array<string>} [options.filters.nftAddresses] - NFT contract addresses (optional)
   * @param {number} [options.pagination.page] - Pagination page (optional)
   * @param {number} [options.pagination.limit] - Pagination limit (optional)
   * @returns {Array<object>} Array of listings hashmaps
   *
   * @example
   * // get listings without specifying pagination or filters
   * const listings = await nftfi.listings.get();
   *
   * @example
   * // get the first `page` of listings, filtered by `nftAddresses`
   * const listings = await nftfi.listings.get({
   *   filters: {
   *     nftAddresses: ['0x11111111', '0x22222222']
   *   },
   *   pagination: {
   *     page: 1,
   *     limit: 20
   *   }
   * });
   */
  async get(options = {}) {
    let limit = options?.pagination?.limit || this.#config.pagination.limit;
    let page = options?.pagination?.page || this.#config.pagination.page;
    let nftAddresses = options?.filters?.nftAddresses || [];
    let response = await this.#api.get({
      uri: 'listings',
      params: {
        nftAddresses: nftAddresses.join(),
        page: page,
        limit: limit
      }
    });
    let listings = response['results'];

    listings = listings.map(this.#helper.addCurrencyUnit);
    return listings;
  }
}

export default Listings;
