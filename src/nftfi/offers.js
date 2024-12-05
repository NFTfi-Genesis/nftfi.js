/**
 * @class
 * Class for working with offers.
 */
class Offers {
  #account;
  #api;
  #offersHelper;
  #loans;
  #erc20;
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
    this.#erc20 = options?.erc20;
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
   * @param {Array<string>} [options.filters.nftfi.contract.name.in] - Contract names to filter by (optional)
   * @param {string} [options.filters.loan.apr.lte] - Max apr to filter by (optional)
   * @param {string} [options.filters.loan.effectiveApr.lte] - Max effective apr to filter by (optional)
   * @param {string} [options.filters.loan.duration.eq] - Loan duration to filter by (optional)
   * @param {Array<number>} [options.filters.loan.duration.nin] - Loan durations to exclude (optional)
   * @param {string} [options.filters.loan.currency.address.eq] - Loan currency to filter by (optional)
   * @param {boolean} [options.filters.interest.prorated] - Filter for flexible or fixed offers (optional)
   * @param {string} [options.filters.type] - Filter for offers of a certain type, `v3.asset` or `v3.collection` (optional)
   * @param {Array<string>} [options.filters.type.in] - Filter for offers that match one of many types (optional)
   * @param {number} [options.pagination.page] - Pagination page (optional)
   * @param {number} [options.pagination.limit] - Pagination limit (optional)
   * @param {string} [options.pagination.sort] - Field to sort by (optional)
   * @param {'asc' | 'desc'} [options.pagination.direction] - Direction to sort by (optional)
   * @param {boolean} [options.validation.check=true] - Validate offers and append error info (optional)
   * @param {boolean} [options.validation.refinance=false] - Validate offers checking if they're valid in the context of refinancing, works when offers are filtered by lender address (optional)
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
   *     type: 'v3.collection'
   *     nft: {
   *       address: "0x00000000",
   *     },
   *     lender:{
   *       address: {
   *         eq: "0x12345567"
   *       }
   *     },
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
      let lenderBalances;
      if (options?.validation?.refinance) {
        const tokens = [this.#config.erc20.weth, this.#config.erc20.usdc, this.#config.erc20.dai];
        const balancePromises = tokens.map(async token => this.#erc20.balanceOf({ token }));
        const balances = await Promise.all(balancePromises);
        lenderBalances = tokens.reduce((acc, token, index) => {
          acc[token.address] = balances[index].toString();
          return acc;
        }, {});
      }

      const params = this.#offersHelper.getParams({ ...options, lender: { balances: lenderBalances } });
      const response = await this.#api.get({
        uri: 'v0.3/offers',
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
   * Counts offers matching specified filters and groups by specified grouping value.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} [options.filters.nft.address] - NFT contract address to filter by
   * @param {string} [options.filters.nft.id] - NFT id of the asset to filter by (optional)
   * @param {string} [options.filters.lender.address.eq] - Lender wallet address to filter by
   * @param {string} [options.filters.lender.address.ne] - Lender wallet address to ignore
   * @param {string} [options.group] - Field to group by
   * @returns {Array<object>} Array of response object
   *
   * @example
   * // Count offers made by lenderAddress for a given NFT grouped by currency
   * const results = await nftfi.offers.count({
   *   filters: {
   *     nft: {
   *       address: "0x11111111",
   *       id: "42"
   *     },
   *     lender: {
   *       address: {
   *         eq: "0x123"
   *       }
   *     }
   *   },
   *   group: "termsCurrencyAddress"
   * });
   */
  async count(options = {}) {
    try {
      const params = this.#offersHelper.getParams(options);
      const { result, errors } = await this.#api.get({
        uri: 'v0.1/offers-count',
        params
      });
      if (errors) return this.#error.handle(errors);
      return this.#result.handle(result);
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Creates a new offer on a NFT or collection.
   *
   * @param {object} options - Config options for this method
   * @param {object} options.type - Type of the offer
   * @param {object} options.nft - NFT to place an offer on
   * @param {number} [options.nft.ids.from] - "from" Starting ID of the NFT range (inclusive, optional). Requires options.type to be "v3.collection"
   * @param {number} [options.nft.ids.to] - "to" Ending ID of the NFT range (inclusive, optional). Requires options.type to be "v3.collection"
   * @param {object} options.borrower - Owner of the NFT
   * @param {object} options.terms - Terms of the offer
   * @returns {object} Response object
   *
   * @example
   * // Create a Flexible offer on a NFT
   * const offer = await nftfi.offers.create({
   *   type: 'v3.asset',
   *   nft: { address: '0x22222222', id: '2' },
   *   borrower: { address: '0x11111111' },
   *   terms: {
   *     principal: '1000000000000000000',
   *     repayment: '1100000000000000000',
   *     origination: '100000000000000000',
   *     interest: { prorated: true },
   *     duration: 31536000,
   *     currency: '0x00000000',
   *     expiry: { seconds: 1722260287 }
   *   }
   * });
   *
   * @example
   * // Create a Fixed offer on a Collection of NFTs
   * const offer = await nftfi.offers.create({
   *   type: 'v3.collection',
   *   nft: { address: '0x22222222' },
   *   terms: {
   *     principal: '1000000000000000000',
   *     repayment: '1100000000000000000',
   *     origination: '0',
   *     interest: { prorated: false },
   *     duration: 31536000,
   *     currency: '0x00000000',
   *     expiry: { seconds: 1722260287 }
   *   }
   * });
   *
   * @example
   * // Create a flexible offer on a Collection range of NFTs
   * const offer = await nftfi.offers.create({
   *   type: 'v3.collection',
   *   nft: { address: '0x22222222', ids: { from: 1, to: 10 } },
   *   terms: {
   *     principal: '1000000000000000000',
   *     repayment: '1100000000000000000',
   *     origination: '0',
   *     interest: { prorated: true },
   *     duration: 31536000,
   *     currency: '0x00000000',
   *     expiry: { seconds: 1722260287 }
   *   }
   * });
   */
  async create(options) {
    try {
      this.#assertion.hasSigner();
      options = { ...options.listing, ...options }; // copying options.listing fields onto the root, for backwards compatibility.
      let errors;
      let response;
      const contractName = options?.nftfi?.contract?.name;
      const type = options?.type;
      switch (type) {
        case this.#config.protocol.v3.type.asset.name: {
          let payload = await this.#offersHelper.constructAssetOffer(options);
          response = await this.#api.post({
            uri: 'v0.3/offers',
            payload
          });
          break;
        }
        case this.#config.protocol.v3.type.collection.name: {
          let payload = await this.#offersHelper.constructCollectionOffer(options);
          response = await this.#api.post({
            uri: 'v0.3/offers',
            payload
          });
          break;
        }
        default: {
          if (type) {
            errors = { 'type': [`${type} not supported`] };
          } else if (contractName) {
            errors = { 'nftfi.contract.name': [`${contractName} not supported`] };
          }
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
   * @param {string} [options.offer.type] - Type of offer `v3.asset`, `v3.collection`
   * @param {string} [options.offer.contract.name] - Name of contract which the offer was created for: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
   * @returns {object} Response object
   *
   *
   * @example
   * // Revoke v3 offer
   * const nonce = offer.lender.nonce;
   * const type = offer.type;
   * const result = await lender.offers.revoke({
   *   offer: { nonce, type }
   * });
   *
   * @example
   * // Revoking a v2 offer
   * const nonce = offer.lender.nonce;
   * const result = await lender.offers.revoke({
   *   offer: { nonce },
   *   nftfi: { contract: { name: offer.nftfi.contract.name } }
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
   *   offer,
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
