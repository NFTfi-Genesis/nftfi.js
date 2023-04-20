/**
 * @class
 * Class for working with OG allocations.
 */
class DropsOgAllocations {
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
   * const allocation = await nftfi.drops.og.allocations.get();
   */
  async get() {
    try {
      const accountAddress = this.#account.getAddress();
      const response = await this.#api.get({
        uri: `drops/og/allocations/${accountAddress}`
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

export default DropsOgAllocations;
