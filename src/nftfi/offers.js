/**
 * @class
 * Class for working with offers.
 */
class Offers {
  #account;
  #api;
  #offersHelper;
  #loans;
  #config;
  #validator;
  #requests;
  #result;
  #error;
  #helper;
  #assertion;

  constructor(options = {}) {
    this.#account = options?.account;
    this.#api = options?.api;
    this.#offersHelper = options?.offersHelper;
    this.#loans = options?.loans;
    this.#config = options?.config;
    this.#validator = options?.offersValidator;
    this.#requests = options?.offersRequests;
    this.#error = options?.error;
    this.#result = options?.result;
    this.#helper = options?.helper;
    this.#assertion = options?.assertion;
  }

  /**
   * When called without filtering by an NFT address, lender address or borrower address, defaults to filtering by your account address as lender.
   * When provided with filters, gets all offers by specified filters.
   *
   * @param {object} [options] - Hashmap of config options for this method
   * @param {string} [options.filters.nft.address] - NFT contract address to filter by (optional)
   * @param {string} [options.filters.nft.id] - NFT id of the asset to filter by (optional)
   * @param {string} [options.filters.lender.address.eq] - Lender wallet address to filter by (optional)
   * @param {string} [options.filters.borrower.address.eq] - Borrower wallet address to filter by (optional)
   * @param {string} [options.filters.lender.address.ne] - Lender wallet address to exclude (optional)
   * @param {string} [options.filters.nftfi.contract.name] - Contract name to filter by (optional)
   * @param {string} [options.filters.loan.apr.lte] - Max apr to filter by (optional)
   * @param {string} [options.filters.loan.duration.eq] - Loan duration to filter by (optional)
   * @param {Array<number>} [options.filters.loan.duration.nin] - Loan durations to exclude (optional)
   * @param {string} [options.filters.loan.currency.address.eq] - Loan currency to filter by (optional)
   * @param {number} [options.pagination.page] - Pagination page (optional)
   * @param {number} [options.pagination.limit] - Pagination limit (optional)
   * @param {string} [options.pagination.sort] - Field to sort by (optional)
   * @param {'asc' | 'desc'} [options.pagination.direction] - Direction to sort by (optional)
   * @param {boolean} [options.validation.check=true] - Validate offers and append error info (optional)
   * @param {'required' | 'optional' | 'none'} [options.auth.token] - Specify if call to fetch offers should be authed, un-authed calls will always redact offers signature. By default, auth is optional. (optional)
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
   *         name: "v2-3.loan.fixed.collection"
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
    try {
      const params = this.#offersHelper.getParams(options);
      const response = await this.#api.get({
        uri: 'v0.1/offers',
        auth: { token: options?.auth?.token || 'optional' },
        params
      });
      let results = response?.results.map(this.#helper.addCurrencyUnit) || [];
      const shouldNotValidate = options?.validation?.check === false;
      if (!shouldNotValidate && results?.length > 0) {
        results = await Promise.all(
          results.map(async offer => {
            const errors = await this.#validator.validate({ offer });
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
   *       name: "v2-3.loan.fixed"
   *     }
   *   }
   * });
   */
  async create(options) {
    try {
      this.#assertion.hasSigner();
      options = { ...options.listing, ...options }; // copying options.listing fields onto the root, for backwards compatibility.
      let errors;
      let response;
      const contractName = options.nftfi.contract.name;
      switch (contractName) {
        case 'v2-3.loan.fixed': {
          let payload = await this.#offersHelper.constructV2_3Offer(options);
          response = await this.#api.post({
            uri: 'v0.1/offers',
            payload
          });
          break;
        }
        case 'v2-3.loan.fixed.collection': {
          let payload = await this.#offersHelper.constructV2_3FixedCollectionOffer(options);
          response = await this.#api.post({
            uri: 'v0.1/offers',
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
    } catch (e) {
      return this.#error.handle(e);
    }
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
    try {
      const uri = `v0.1/offers/${options.offer.id}`;
      return await this.#api.delete({ uri, auth: { token: 'required' } });
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Revokes an active offer made by your account.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {object} options.offer.nonce - The nonce of the offer to be deleted
   * @param {string} options.nftfi.contract.name - Name of contract which the offer was created for: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
   * @returns {object} Response object
   *
   * @example
   * // Get first available offer made by your account
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
    return await this.#loans.revokeOffer(options);
  }

  /**
   * Validates an offer based on specified checks.
   *
   * @param {object} options - Parameters for the validation.
   * @param {object} options.offer - The offer object to validate.
   * @param {string[]} [options.checks] - An array of checks to validate against. If not provided or empty, all supported checks are performed. (optional)
   * @returns {object} Response object
   *
   * @example
   * // Validate an offer based on specified checks
   * const validation = await nftfi.offers.validate({
   *   offer: {
   *     terms: {
   *       loan: {
   *         principal: 2000000000000000000,
   *         repayment: 1100000000000000000,
   *         currency: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
   *         duration: 604800,
   *         expiry: 1760696014,
   *       }
   *     },
   *     nft: {
   *       address: "0x123",
   *       id: "00000"
   *     },
   *     lender: {
   *       address: "0x1111111",
   *       nonce: "123"
   *     },
   *     nftfi: {
   *       contract: {
   *         name: "v2.loan.fixed.collection"
   *       },
   *       fee: {
   *         bps: "500"
   *       }
   *     },
   *     referrer: {
   *       address: "0x0000000"
   *     },
   *     signature: "0x0000000"
   *   },
   *   checks: [
   *     "signature",
   *     "terms.principal",
   *     "lender.nonce"
   *   ]
   * });
   */
  async validate(options) {
    try {
      this.#assertion.hasProvider();
      const warnings = await this.#validator.validate(options);
      let result = {};
      result.valid = warnings === null;
      if (warnings) {
        result.warnings = warnings;
      }
      return this.#result.handle({ ...result });
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  get requests() {
    return this.#requests;
  }
}

export default Offers;
