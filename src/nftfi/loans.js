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
   * Liquidate `defaulted` loans in which your account is a participant.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.loan.id - The ID of the loan being liquidated
   * @param {string} options.nftfi.contract.name - The contract used to facilitate the loan: `v1.loan.fixed`, `v2.loan.fixed`
   * @returns {object} Response object
   *
   * @example
   * // Liquidate a v1 fixed loan
   * const loans = await nftfi.loans.get({
   *   loan: {
   *     id: 1
   *   },
   *   nftfi: {
   *     contract: {
   *       name: 'v1.loan.fixed'
   *     }
   *   }
   * });
   *
   * @example
   * // Liquidate a v2 fixed loan
   * const loans = await nftfi.loans.get({
   *   loan: {
   *     id: 2
   *   },
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
        success = await this.#fixed.v1.liquidate({
          loan: { id: options.loan.id }
        });
        break;
      case 'v2.loan.fixed':
        success = await this.#fixed.v2.liquidate({
          loan: { id: options.loan.id }
        });
        break;
    }
    return {
      success
    };
  }
}

export default Loans;
