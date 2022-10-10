/**
 * @class
 * Class for working with loans.
 */
class Loans {
  #api;
  #account;
  #fixed;

  constructor(options = {}) {
    this.#api = options?.api;
    this.#account = options?.account;
    this.#fixed = options?.fixed;
  }

  /**
   * Gets loans in which your account is a participant.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.filters.counterparty - Loans where the counterparty is: `lender` or `borrower`
   * @param {string} options.filters.status - Loan status: `escrow`, `defaulted`, `repaid` or `liquidated`
   * @returns {Array<object>} Array of listing objects
   *
   * @example
   * // Get loans in `escrow` where your account is the `lender`
   * const loans = await nftfi.loans.get({
   *   filters: {
   *     counterparty: 'lender',
   *     status: 'escrow'
   *   }
   * });
   */
  async get(options) {
    let response = await this.#api.get({
      uri: 'loans',
      params: {
        accountAddress: this.#account.getAddress(),
        counterparty: options.filters.counterparty,
        status: options.filters.status
      }
    });
    const loans = response['results'];
    return loans;
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
   * @param {string} options.offer.nftfi.contract.name - Name of contract used to facilitate the loan: `v1.loan.fixed`, `v2.loan.fixed`
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
   *       contract: { name: 'v2.loan.fixed' }
   *     }
   *   }
   * });
   */
  async begin(options) {
    let success = false;
    switch (options.offer.nftfi.contract.name) {
      case 'v2.loan.fixed':
        success = await this.#fixed.v2.acceptOffer(options);
        break;
    }
    return {
      success
    };
  }

  /**
   * Liquidate `defaulted` loans in which your account is a participant.
   * Can be called once a loan has finished its duration and the borrower still has not repaid.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.loan.id - The ID of the loan being liquidated
   * @param {string} options.nftfi.contract.name - Name of contract used to facilitate the liquidation: `v1.loan.fixed`, `v2.loan.fixed`
   * @returns {object} Response object
   *
   * @example
   * // Liquidate a v1 fixed loan
   * const result = await nftfi.loans.liquidate({
   *   loan: { id: 1 },
   *   nftfi: {
   *     contract: {
   *       name: 'v1.loan.fixed'
   *     }
   *   }
   * });
   *
   * @example
   * // Liquidate a v2 fixed loan
   * const result = await nftfi.loans.liquidate({
   *   loan: { id: 2 },
   *   nftfi: {
   *     contract: {
   *       name: 'v2.loan.fixed'
   *     }
   *   }
   * });
   */
  async liquidate(options) {
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
    }
    return {
      success
    };
  }

  /**
   * Repay a loan. Can be called at any time after the loan has begun and before loan expiry.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.loan.id - The ID of the loan being repaid
   * @param {string} options.nftfi.contract.name - Name of contract used to facilitate the repayment: `v1.loan.fixed`, `v2.loan.fixed`
   * @returns {object} Response object
   *
   * @example
   * // Repay a v1 fixed loan
   * const result = await nftfi.loans.repay({
   *   loan: { id: 1 },
   *   nftfi: {
   *     contract: {
   *       name: 'v1.loan.fixed'
   *     }
   *   }
   * });
   *
   * @example
   * // Repay a v2 fixed loan
   * const result = await nftfi.loans.repay({
   *   loan: { id: 2 },
   *   nftfi: {
   *     contract: {
   *       name: 'v2.loan.fixed'
   *     }
   *   }
   * });
   */
  async repay(options) {
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
    }
    return {
      success
    };
  }

  /**
   * Revokes an active offer made by your account.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {object} options.offer.nonce - The nonce of the offer to be deleted
   * @param {string} options.nftfi.contract.name - Name of contract which the offer was created for: `v1.loan.fixed`, `v2.loan.fixed`
   * @returns {object} Response object
   *
   * @example
   * // Revoke a v1 fixed loan offer
   * const revoked = await nftfi.loans.revoke({
   *   offer: {
   *     nonce: '42'
   *   },
   *   nftfi: {
   *     contract: {
   *       name: 'v1.loan.fixed'
   *     }
   *   }
   * });
   *
   * @example
   * // Revoke a v2 fixed loan offer
   * const revoked = await nftfi.loans.revoke({
   *   offer: {
   *     nonce: '42'
   *   },
   *   nftfi: {
   *     contract: {
   *       name: 'v2.loan.fixed'
   *     }
   *   }
   * });
   */
  async revokeOffer(options) {
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
    }
    return {
      success
    };
  }
}

export default Loans;
