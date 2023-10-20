class OffersRequests {
  #api;
  #account;
  #config;
  #result;
  #error;
  #contractsAddresses;

  constructor(options = {}) {
    this.#api = options?.api;
    this.#account = options?.account;
    this.#config = options?.config;
    this.#error = options?.error;
    this.#result = options?.result;
    this.#contractsAddresses = {
      [this.#config.loan.fixed.collection.v2.name]: this.#config.loan.fixed.collection.v2.address,
      [this.#config.loan.fixed.v2_1.name]: this.#config.loan.fixed.v2_1.address
    };
  }

  /**
   * Creates a new offer request for a NFT.
   *
   * @param {object} [options] - Hashmap of config options for this method
   * @param {string} [options.nft.address] - NFT contract address
   * @param {string} [options.nft.id] - NFT id of the asset
   * @param {string} [options.desiredTerms.currency] - Desired term currency (optional)
   * @param {string} [options.desiredTerms.principal] - Desired term principal (optional)
   * @param {number} [options.desiredTerms.repayment] - Desired term repayment (optional)
   * @param {string} [options.desiredTerms.duration] - Desired term duration (optional)
   * @param {string} [options.desiredTerms.contract.name] - Name of contract which the offer was created for: `v2-3.loan.fixed`
   * @returns {object} Offer request
   *
   * @example
   * // Create an Offer Request
   * const offerRequest = await nftfi.offers.requests.create({
   *  desiredTerms: {
   *    currency: '0x00000000',
   *    principal: '1000000000',
   *    repayment: '2000000000',
   *    duration: 86400 * 7, // 7 days (in seconds)
   *    contract: {
   *      name: 'v2-3.loan.fixed'
   *    }
   *  },
   *  nft: {
   *    address: "0x00000000",
   *    id: "42"
   *  }
   * });
   */
  async create({ desiredTerms, nft }) {
    const contractAddress = this.#contractsAddresses[desiredTerms.contract.name];
    if (!contractAddress) {
      return this.#error.handle('Invalid contract name specified!');
    }
    const payload = {
      data: {
        desiredTerms: {
          currency: desiredTerms.currency,
          principal: desiredTerms.principal,
          repayment: desiredTerms.repayment,
          duration: desiredTerms.duration,
          contract: {
            name: desiredTerms.contract.name,
            address: contractAddress,
            fee: { bps: this.#config.loan.adminFeeInBasisPoints }
          }
        },
        nft: {
          id: nft.id,
          address: nft.address
        },
        borrower: {
          address: this.#account.getAddress()
        },
        chain: {
          id: this.#config.chainId
        }
      },
      schema: {
        version: '0.1'
      }
    };
    try {
      const response = await this.#api.post({
        uri: 'v0.1/offer-requests',
        payload
      });
      if (response?.errors) {
        return this.#error.handle({ errors: response?.errors });
      } else {
        return this.#result.handle(response?.result);
      }
    } catch (e) {
      return this.#error.handle(e);
    }
  }
}

export default OffersRequests;
