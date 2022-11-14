/**
 * @class
 * Class for working with offers.
 */
class Offers {
  #account;
  #api;
  #helper;
  #loans;
  #config;
  #validator;
  #result;
  #error;

  constructor(options = {}) {
    this.#account = options?.account;
    this.#api = options?.api;
    this.#helper = options?.offersHelper;
    this.#loans = options?.loans;
    this.#config = options?.config;
    this.#validator = options?.offersValidator;
    this.#error = options?.error;
    this.#result = options?.result;
  }

  // We will start using #result and #error to standardise responses from the sdk. Not all functions use this pattern yet, but this is the goal.

  /**
   * When called with no argument, gets all offers made by your account.
   * When provided with filters, gets all offers by specified filters.
   *
   * @param {object} [options] - Hashmap of config options for this method
   * @param {string} [options.filters.nft.address] - NFT contract address to filter by (optional)
   * @param {string} [options.filters.nft.id] - NFT id of the asset to filter by (optional)
   * @param {string} [options.filters.lender.address.eq] - Lender wallet address to filter by (optional)
   * @param {string} [options.filters.lender.address.ne] - Lender wallet address to exclude (optional)
   * @param {string} [options.filters.nftfi.contract.name] - Contract name to filter by (optional)
   * @param {number} [options.pagination.page] - Pagination page (optional)
   * @param {number} [options.pagination.limit] - Pagination limit (optional)
   * @param {string} [options.pagination.sort] - Field to sort by (optional)
   * @param {'asc' | 'desc'} [options.pagination.direction] - Direction to sort by (optional)
   * @param {boolean} [options.validation.check=true] - Validate offers and append error info (optional)
   * @returns {Array<object>} Array of offers
   *
   * @example
   * // Get all offers made by your account
   * const offers = await nftfi.offers.get();
   *
   * @example
   * // Get the first page of offers made by your account, for a given NFT
   * const offers = await nftfi.offers.get({
   *   filters: {
   *     nft: {
   *       address: "0x00000000",
   *       id: "42"
   *     }
   *   },
   *   pagination:{
   *     page: 1,
   *     limit: 10
   *   }
   * });
   *
   * @example
   * // Get all offers made by your account, for multiple NFTs in a collection
   * const offers = await nftfi.offers.get({
   *   filters: {
   *     nft: {
   *       address: "0x00000000"
   *     }
   *   }
   * });
   *
   * @example
   * // Get the first page of collection offers made by a specific lender
   * const offers = await nftfi.offers.get({
   *   filters: {
   *     nft: {
   *       address: "0x00000000",
   *     },
   *     lender:{
   *       address: {
   *         eq: "0x12345567"
   *       }
   *     },
   *     nftfi: {
   *       contract: {
   *         name: "v2.loan.fixed.collection"
   *       }
   *     }
   *   },
   *   pagination:{
   *     page: 1,
   *     limit: 10
   *   }
   * });
   *
   * @example
   * // Get all offers made by your account, and dont perform validation checks.
   * const offers = await nftfi.offers.get({
   *   validation: {
   *     check: false
   *   }
   * });
   */
  async get(options = {}) {
    const params = this.#helper.getParams(options);
    try {
      const response = await this.#api.get({
        uri: 'offers',
        params
      });
      let results = response?.results || [];
      const shouldNotValidate = options?.validation?.check === false;
      if (!shouldNotValidate && results?.length > 0) {
        results = await Promise.all(
          results.map(async offer => {
            const errors = await this.#validator.validate(offer);
            return { ...offer, errors: errors };
          })
        );
      }
      if (options?.pagination) {
        return this.#result.handle({ pagination: { total: response?.pagination?.total }, results });
      }
      return results;
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Creates a new offer on a NFT or collection.
   *
   * @param {object} options - Config options for this method
   * @param {object} options.terms - Terms of the offer
   * @param {object} options.nft - NFT to place an offer on
   * @param {object} options.borrower - Owner of the NFT
   * @param {object} options.nftfi - NFTfi options
   * @returns {object} Response object
   *
   * @example
   * // Create an offer on a NFT
   * const offer = await nftfi.offers.create({
   *   terms: {
   *     principal: 1000000000000000000,
   *     repayment: 1100000000000000000,
   *     duration: 86400 * 7, // 7 days (in seconds)
   *     currency: "0x00000000",
   *     expiry: 21600 // 6 hours (in seconds)
   *   },
   *   nft: {
   *     address: "0x00000000",
   *     id: "42"
   *   },
   *   borrower: {
   *     address: "0x00000000"
   *   },
   *   nftfi: {
   *     contract: {
   *       name: "v2-1.loan.fixed"
   *     }
   *   }
   * });
   */
  async create(options) {
    options = { ...options.listing, ...options }; // copying options.listing fields onto the root, for backwards compatibility.
    let errors;
    let response;
    const contractName = options.nftfi.contract.name;
    switch (contractName) {
      case 'v2-1.loan.fixed': {
        let payload = await this.#helper.constructV2Offer(options);
        response = await this.#api.post({
          uri: 'offers',
          payload
        });
        break;
      }
      case 'v2.loan.fixed.collection': {
        let payload = await this.#helper.constructV2FixedCollectionOffer(options);
        response = await this.#api.post({
          uri: 'offers',
          payload
        });
        break;
      }
      default: {
        errors = { 'nftfi.contract.name': [`${contractName} not supported`] };
        response = { errors };
        break;
      }
    }
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
    const result = await this.#api.delete({ uri });
    return result;
  }

  /**
   * Revokes an active offer made by your account.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {object} options.offer.nonce - The nonce of the offer to be deleted
   * @param {string} options.nftfi.contract.name - Name of contract which the offer was created for: `v1.loan.fixed`, `v2.loan.fixed`, `v2-1.loan.fixed`
   * @returns {object} Response object
   *
   * @example
   * // Get first avilable offer made by your account
   * const offers = await nftfi.offers.get();
   * const nonce = offers[0]['lender']['nonce'];
   * const contractName = offers[0]['nftfi']['contract']['name']
   * // Revoke offer
   * const revoked = await nftfi.offers.revoke({
   *   offer: { nonce },
   *   nftfi: { contract: { name: contractName } }
   * });
   */
  async revoke(options) {
    let result = await this.#loans.revokeOffer(options);
    return result;
  }
}

export default Offers;
