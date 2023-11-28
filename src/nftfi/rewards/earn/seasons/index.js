/**
 * @class
 * Class for working with Earn seasons.
 */
class RewardsEarnSeasons {
  #api;
  #result;
  #error;

  constructor(options = {}) {
    this.#api = options?.api;
    this.#result = options?.result;
    this.#error = options?.error;
  }

  /**
   * Gets Earn season.
   *
   * @returns {Object} An object containing information about Earn season.
   *
   * @example
   * // Gets an active Earn season
   * const season = await nftfi.rewards.earn.seasons.getActive();
   */
  async getActive() {
    try {
      const list = await this.#api.get({ uri: '/v0.1/rewards/earn/seasons?status=active' });
      return this.#result.handle(list.results[0]);
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Gets Earn seasons list.
   *
   * @returns {Object} An array containing objects about Earn seasons.
   *
   * @example
   * const seasons = await nftfi.rewards.earn.seasons.list();
   */
  async list() {
    try {
      const list = await this.#api.get({ uri: '/v0.1/rewards/earn/seasons' });
      return this.#result.handle(list.results);
    } catch (e) {
      return this.#error.handle(e);
    }
  }
}

export default RewardsEarnSeasons;
