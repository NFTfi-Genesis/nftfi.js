/**
 * @class
 * Class for working with OG allocations.
 */
class RewardsOgAllocations {
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
   * Gets og points for your account.
   *
   * @returns {Object} An object containing information about your OG allocation.
   *
   * @example
   * // Get your OG drop allocation
   * const allocation = await nftfi.rewards.og.allocations.get();
   */
  async get() {
    try {
      const accountAddress = this.#account.getAddress();
      const response = await this.#api.get({
        uri: `rewards/og/allocations/${accountAddress}`
      });
      if (!response) {
        return this.#result.handle({ status: { id: 'not-eligible' } });
      }
      return this.#result.handle(response);
    } catch (e) {
      return this.#error.handle(e);
    }
  }
}

export default RewardsOgAllocations;
