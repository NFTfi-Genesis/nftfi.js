/**
 * @class
 * Class for working with loans.
 */
class Loans {
  #api;
  #account;
  #fixed;
  #config;
  #helper;
  #assertion;
  #validation;
  #result;
  #error;

  constructor(options = {}) {
    this.#result = options?.result;
    this.#api = options?.api;
    this.#config = options?.config;
    this.#account = options?.account;
    this.#fixed = options?.fixed;
    this.#helper = options?.helper;
    this.#validation = options?.validation;
    this.#assertion = options?.assertion;
    this.#error = options?.error;
  }

  /**
   * Gets loans by specific filters.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {object} options.filters - Hashmap of filter options for this method
   * @param {string} options.filters.status - Loan status: `active`, `defaulted`, `repaid` or `liquidated`
   * @param {string} [options.filters.borrower.address] - Address of the borrower
   * @param {string} [options.filters.lender.address] - Address of the lender
   * @param {string} [options.filters.nft.addresses] - Array of NFT addresses being used as collateral
   * @param {object} [options.sort] - Hashmap of config sorting options for this method
   * @param {string} [options.sort.by] - Field to sort by `repayment`, `interest`, `apr`, `duration`, `dueDate`, `nftName`
   * @param {string} [options.sort.direction] - Sort direction: `asc` or `desc`
   * @param {object} [options.pagination] - Hashmap of pagination options for this method
   * @param {number} [options.pagination.page] - Page number
   * @param {number} [options.pagination.limit] - Number of results per page
   * @returns {Array<object>} Array of listing objects
   *
   * @example
   * // Get `active` loans where your account is the `lender`
   * const { data: { results } } = await nftfi.loans.get({
   *   filters: {
   *     lender: {
   *       address: nftfi.account.getAddress()
   *     },
   *     status: 'active'
   *   }
   * });
   *
   * @example
   * // Get `defaulted` loans that your account is either `lender` or `borrower`
   * const { data: { results } } = await nftfi.loans.get({
   *   filters: {
   *     lender: {
   *       address: nftfi.account.getAddress()
   *     },
   *     borrower: {
   *       address: nftfi.account.getAddress()
   *     },
   *     status: 'defaulted'
   *   },
   *   pagination: {
   *    page: 1,
   *    limit: 10
   *   }
   * });
   *
   * @example
   * // Get `repaid` loans that used one of the specified `nft addresses`
   * const { data: { results } } = await nftfi.loans.get({
   *   filters: {
   *     nft: {
   *       addresses: ['0x0', '0x1']
   *     },
   *     status: 'repaid'
   *   },
   *  sort: {
   *    by: 'repayment',
   *    direction: 'desc'
   *  },
   * });
   */
  async get(options = {}) {
    try {
      const response = await this.#api.get({
        uri: 'v0.2/loans',
        params: this.#helper.getParams(options)
      });

      return this.#result.handle(response);
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Begin a loan. Called by the borrower when accepting a lender's offer.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.offer.nft.address - Address of the NFT being used as collateral
   * @param {string} options.offer.nft.id - ID of NFT being used as collateral
   * @param {string} options.offer.terms.loan.currency - Address of the ERC20 contract being used as principal/interest
   * @param {number} options.offer.terms.loan.principal - Sum of money transferred from lender to borrower at the beginning of the loan
   * @param {number} options.offer.terms.loan.repayment - Maximum amount of money that the borrower would be required to retrieve their collateral
   * @param {number} options.offer.terms.loan.duration - Amount of time (measured in seconds) that may elapse before the lender can liquidate the loan
   * @param {number} options.offer.terms.loan.expiry - Timestamp (in seconds) of when the signature expires
   * @param {string} options.offer.lender.address - Address of the lender that signed the offer
   * @param {string} options.offer.lender.nonce - Nonce used by the lender when they signed the offer
   * @param {string} options.offer.signature - ECDSA signature of the lender
   * @param {number} options.offer.nftfi.fee.bps - Percent (measured in basis points) of the interest earned that will be taken as a fee by the contract admins when the loan is repaid
   * @param {string} options.offer.nftfi.contract.name - Name of contract used to facilitate the loan: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
   * @returns {object} Response object
   *
   * @example
   * // Begin a loan on a lender's offer.
   * const result = await nftfi.loans.begin({
   *   offer: {
   *     nft: {
   *       id: '42',
   *       address: '0x00000000',
   *     },
   *     lender: {
   *       address: '0x00000000',
   *       nonce: '314159265359'
   *     },
   *     terms: {
   *       loan: {
   *         principal: 1000000000000000000,
   *         repayment: 1100000000000000000,
   *         duration: 86400 * 7, // 7 days (in seconds)
   *         currency: "0x00000000",
   *         expiry: 1690548548 // Friday, 28 July 2023 14:49:08 GMT+02:00
   *       }
   *     },
   *     signature: '0x000000000000000000000000000000000000000000000000000',
   *     nftfi: {
   *       fee: { bps: 500 },
   *       contract: { name: 'v2-3.loan.fixed' }
   *     }
   *   }
   * });
   */
  async begin(options) {
    try {
      this.#assertion.hasSigner();
      let errors;
      let response;
      const contractName = options.offer.nftfi.contract.name;
      switch (contractName) {
        case 'v2-3.loan.fixed': {
          let success = await this.#fixed.v2_3.acceptOffer(options);
          response = { success };
          break;
        }
        case 'v2-3.loan.fixed.collection': {
          let success = await this.#fixed.collection.v2_3.acceptOffer(options);
          response = { success };
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
   * Liquidate `defaulted` loans in which your account is a participant.
   * Can be called once a loan has finished its duration and the borrower still has not repaid.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.loan.id - The ID of the loan being liquidated
   * @param {string} options.nftfi.contract.name - Name of contract used to facilitate the liquidation: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
   * @returns {object} Response object
   *
   * @example
   * // Liquidate a v2-3 fixed collection loan
   * const result = await nftfi.loans.liquidate({
   *   loan: { id: 3 },
   *   nftfi: {
   *     contract: {
   *       name: 'v2-3.loan.fixed.collection'
   *     }
   *   }
   * });
   *
   * @example
   * // Liquidate a v2.3 fixed loan
   * const result = await nftfi.loans.liquidate({
   *   loan: { id: 2 },
   *   nftfi: {
   *     contract: {
   *       name: 'v2-3.loan.fixed'
   *     }
   *   }
   * });
   */
  async liquidate(options) {
    try {
      this.#assertion.hasSigner();
      let success = false;
      switch (options.nftfi.contract.name) {
        case 'v1.loan.fixed':
          success = await this.#fixed.v1.liquidateOverdueLoan({
            loan: { id: options.loan.id }
          });
          break;
        case 'v2.loan.fixed':
          success = await this.#fixed.v2.liquidateOverdueLoan({
            loan: { id: options.loan.id }
          });
          break;
        case 'v2.loan.fixed.collection':
          success = await this.#fixed.collection.v2.liquidateOverdueLoan({
            loan: { id: options.loan.id }
          });
          break;
        case 'v2-3.loan.fixed.collection':
          success = await this.#fixed.collection.v2_3.liquidateOverdueLoan({
            loan: { id: options.loan.id }
          });
          break;
        case 'v2-1.loan.fixed':
          success = await this.#fixed.v2_1.liquidateOverdueLoan({
            loan: { id: options.loan.id }
          });
          break;
        case 'v2-3.loan.fixed':
          success = await this.#fixed.v2_3.liquidateOverdueLoan({
            loan: { id: options.loan.id }
          });
          break;
      }
      return {
        success
      };
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Repay a loan. Can be called at any time after the loan has begun and before loan expiry.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.loan.id - The ID of the loan being repaid
   * @param {string} options.nftfi.contract.name - Name of contract used to facilitate the repayment: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
   * @returns {object} Response object
   *
   * @example
   * // Repay a v2.3 fixed loan
   * const result = await nftfi.loans.repay({
   *   loan: { id: 2 },
   *   nftfi: {
   *     contract: {
   *       name: 'v2-3.loan.fixed'
   *     }
   *   }
   * });
   *
   * @example
   * // Repay a v2-3 fixed collection loan
   * const result = await nftfi.loans.repay({
   *   loan: { id: 3 },
   *   nftfi: {
   *     contract: {
   *       name: 'v2-3.loan.fixed.collection'
   *     }
   *   }
   * });
   */
  async repay(options) {
    try {
      this.#assertion.hasSigner();
      let success = false;
      switch (options.nftfi.contract.name) {
        case 'v1.loan.fixed':
          success = await this.#fixed.v1.payBackLoan({
            loan: { id: options.loan.id }
          });
          break;
        case 'v2.loan.fixed':
          success = await this.#fixed.v2.payBackLoan({
            loan: { id: options.loan.id }
          });
          break;
        case 'v2-1.loan.fixed':
          success = await this.#fixed.v2_1.payBackLoan({
            loan: { id: options.loan.id }
          });
          break;
        case 'v2-3.loan.fixed':
          success = await this.#fixed.v2_3.payBackLoan({
            loan: { id: options.loan.id }
          });
          break;
        case 'v2.loan.fixed.collection':
          success = await this.#fixed.collection.v2.payBackLoan({
            loan: { id: options.loan.id }
          });
          break;
        case 'v2-3.loan.fixed.collection':
          success = await this.#fixed.collection.v2_3.payBackLoan({
            loan: { id: options.loan.id }
          });
          break;
      }
      return {
        success
      };
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Refinance a given loan.
   *
   * @param {Object} options - The options object containing the loan and offer information.
   * @param {Object} options.loan - The loan being refinanced.
   * @param {Object} options.offer - The offer being used to refinance the loan.
   * @returns {object} Response object
   *
   * @example
   * // Identify an active loan where you are the borrower.
   * const { data: { results } } = await nftfi.loans.get({
   *  filters: {
   *   borrower: { address: nftfi.account.getAddress() },
   *   status: 'active'
   * });
   * const loan = results[0];
   *
   * // Fetch offers that match the currency and NFT of the selected loan.
   * // **The offer's currency must align with the loan's currency.**
   * const offers = await borrower.offers.get({
   *   filters: {
   *     nft: { address: loan.nft.address, id: loan.nft.id },
   *     loan: { currency: { address: { eq: loan.terms.loan.currency } } },
   *     nftfi: { contract: { name: nftfi.config.loan.fixed.v2_1.name } }
   *   }
   * });
   * const offer = offers[0];
   *
   * // Approve your obligation receipts with the Refinance contract.
   * const ORApproval = await nftfi.nft.approve({
   *  token: { address: nftfi.config.loan.fixed.v2_1.obligationReceipt.address },
   *  nftfi: { contract: { name: nftfi.config.loan.refinance.name } }
   * });
   *
   * // Approve ERC20 Tokens (if additional payment is needed).
   * const erc20Approval = await nftfi.erc20.approveMax({
   *  token: { address: loan.terms.loan.currency },
   *  nftfi: { contract: { name: nftfi.config.loan.refinance.name } }
   * });
   *
   * // Mint an obligation receipt for this loan.
   * const ORMint = await nftfi.loans.mintObligationReceipt({ loan });
   *
   * // Initiate the refinancing with the selected loan and offer.
   * const refiResult = await nftfi.loans.refinance({
   *   loan,
   *   offer
   * });
   */
  async refinance(options) {
    try {
      this.#assertion.hasSigner();
      await this.#validation.refinance.validateCurrencies(options);
      let error;
      let response;
      const contractName = options.offer.nftfi.contract.name;
      switch (contractName) {
        case 'v2-1.loan.fixed': {
          let success = await this.#fixed.v2_1.refinanceLoan({
            loan: options.loan,
            offer: options.offer
          });
          response = { success };
          break;
        }
        case 'v2-3.loan.fixed': {
          let success = await this.#fixed.v2_3.refinanceLoan({
            loan: options.loan,
            offer: options.offer
          });
          response = { success };
          break;
        }
        case 'v2.loan.fixed.collection': {
          let success = await this.#fixed.collection.v2.refinanceCollectionOfferLoan({
            loan: options.loan,
            offer: options.offer
          });
          response = { success };
          break;
        }
        case 'v2-3.loan.fixed.collection': {
          let success = await this.#fixed.collection.v2_3.refinanceCollectionOfferLoan({
            loan: options.loan,
            offer: options.offer
          });
          response = { success };
          break;
        }
        default: {
          error = { 'nftfi.contract.name': [`${contractName} not supported`] };
          throw error;
        }
      }
      return this.#result.handle(response);
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
   * // Revoke a v2.3 fixed loan offer
   * const revoked = await nftfi.loans.revoke({
   *   offer: {
   *     nonce: '42'
   *   },
   *   nftfi: {
   *     contract: {
   *       name: 'v2-3.loan.fixed'
   *     }
   *   }
   * });
   */
  async revokeOffer(options) {
    try {
      this.#assertion.hasSigner();
      let success = false;
      switch (options.nftfi.contract.name) {
        case 'v1.loan.fixed':
          success = await this.#fixed.v1.cancelLoanCommitmentBeforeLoanHasBegun({
            offer: { nonce: options.offer.nonce }
          });
          break;
        case 'v2.loan.fixed':
          success = await this.#fixed.v2.cancelLoanCommitmentBeforeLoanHasBegun({
            offer: { nonce: options.offer.nonce }
          });
          break;
        case 'v2-1.loan.fixed':
          success = await this.#fixed.v2_1.cancelLoanCommitmentBeforeLoanHasBegun({
            offer: { nonce: options.offer.nonce }
          });
          break;
        case 'v2-3.loan.fixed':
          success = await this.#fixed.v2_3.cancelLoanCommitmentBeforeLoanHasBegun({
            offer: { nonce: options.offer.nonce }
          });
          break;
        case 'v2.loan.fixed.collection':
          success = await this.#fixed.collection.v2.cancelLoanCommitmentBeforeLoanHasBegun({
            offer: { nonce: options.offer.nonce }
          });
          break;
        case 'v2-3.loan.fixed.collection':
          success = await this.#fixed.collection.v2_3.cancelLoanCommitmentBeforeLoanHasBegun({
            offer: { nonce: options.offer.nonce }
          });
          break;
      }
      return {
        success
      };
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Mints an obligation receipt for a given loan.
   *
   * @param {Object} options - The options object containing the loan details and contract information.
   * @param {number} options.loan.nftfi.id - The ID of the loan.
   * @param {string} options.loan.nftfi.contract.name - Name of contract used to facilitate the loan: `v2-1.loan.fixed`, `v2-3.loan.fixed`, `v2.loan.fixed.collection`, `v2-3.loan.fixed.collection`
   * @returns {object} Response object
   *
   * @example
   * // Mint an Obligation Receipt for a v2.3 fixed loan
   * const response = await nftfi.loans.mintObligationReceipt({
   *   loan: {
   *     id: '42',
   *     nftfi: {
   *       contract: {
   *         name: 'v2-3.loan.fixed'
   *       }
   *     }
   *   },
   * });
   */
  async mintObligationReceipt(options) {
    try {
      this.#assertion.hasSigner();
      let error;
      let response;
      const contractName = options.loan.nftfi.contract.name;
      switch (contractName) {
        case 'v2-3.loan.fixed': {
          let success = await this.#fixed.v2_3.mintObligationReceipt(options);
          response = { success };
          break;
        }
        case 'v2-1.loan.fixed': {
          let success = await this.#fixed.v2_1.mintObligationReceipt(options);
          response = { success };
          break;
        }
        case 'v2-3.loan.fixed.collection': {
          let success = await this.#fixed.collection.v2_3.mintObligationReceipt(options);
          response = { success };
          break;
        }
        case 'v2.loan.fixed.collection': {
          let success = await this.#fixed.collection.v2.mintObligationReceipt(options);
          response = { success };
          break;
        }
        default: {
          error = { 'nftfi.contract.name': [`${contractName} not supported`] };
          throw error;
        }
      }
      return this.#result.handle(response);
    } catch (e) {
      return this.#error.handle(e);
    }
  }
}

export default Loans;
