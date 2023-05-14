/**
 * @class
 * Class for working with Earn allocations.
 */
class RewardsEarnAllocations {
  #account;
  #api;
  #result;
  #error;

  constructor(options = {}) {
    this.#account = options?.account;
    this.#api = options?.api;
    this.#result = options?.result;
    this.#error = options?.error;
  }

  /**
   * Gets Earn points for your account.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {object} [options.account.address] - The account address to get the allocations of (optional)
   *
   * @returns {Object} An object containing information about your Earn allocations.
   *
   * @example
   * // Get your Earn reward allocation
   * const points = await nftfi.rewards.earn.allocations.get();
   * const points = await nftfi.rewards.earn.allocations.get({ account: { address: walletAddress } });
   */
  async get(options) {
    try {
      const accountAddress = options?.account?.address || this.#account.getAddress();
      const response = await this.#api.get({
        uri: `rewards/earn/allocations/${accountAddress}`
      });
      return this.#result.handle(response);
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Gets Earn points for the first 100 accounts sorted by rank.
   *
   * @returns {Object} An array containing objects about user's Earn allocations.
   *
   * @example
   * const list = await nftfi.rewards.earn.allocations.list();
   */
  async list() {
    try {
      const list = await this.#api.get({
        uri: 'rewards/earn/allocations'
      });

      return this.#result.handle(list);
    } catch (e) {
      return this.#error.handle(e);
    }
  }
}

export default RewardsEarnAllocations;
