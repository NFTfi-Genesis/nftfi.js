/**
 * @class
 * Class for working with Earn points.
 */
class RewardsEarnPoints {
  #api;
  #result;
  #error;

  constructor(options = {}) {
    this.#api = options?.api;
    this.#result = options?.result;
    this.#error = options?.error;
  }

  /**
   * Gets Earn points for your account.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {object} [options.loan.id] - Id of a loan (required)
   * @param {object} [options.nftfi.contract.name] - Name of the loan contract (required)
   *
   * @returns {Object} An object containing information about your Earn points.
   *
   * @example
   * // Get your Earn reward points
   * const points = await nftfi.rewards.earn.points.get({
   *   loan: {
   *     id: 12345
   *   },
   *   nftfi: {
   *     contract: {
   *        name: "v2-3.loan.fixed"
   *     }
   *   }
   * });
   */
  async get(options) {
    try {
      const response = await this.#api.get(
        {
          uri: 'rewards/earn/points',
          params: {
            loanId: options.loan?.id,
            loanNftfiContractName: options.nftfi?.contract?.name
          }
        },
        {
          error: {
            rethrow: true
          }
        }
      );
      return this.#result.handle(response.results);
    } catch (e) {
      return this.#error.handle(e.response?.data?.errors);
    }
  }
}

export default RewardsEarnPoints;
