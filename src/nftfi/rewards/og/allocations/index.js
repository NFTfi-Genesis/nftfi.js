/**
 * @class
 * Class for working with OG allocations.
 */
class RewardsOgAllocations {
  #account;
  #api;
  #result;
  #error;
  #assertion;

  constructor(options = {}) {
    this.#account = options?.account;
    this.#api = options?.api;
    this.#result = options?.result;
    this.#error = options?.error;
    this.#assertion = options?.assertion;
  }

  /**
   * Gets og points for your account.
   *
   * @param {object} [options] - Hashmap of config options for this method
   * @param {object} [options.account.address] - The account address to get the OG allocation of (optional)
   *
   * @returns {Object} An object containing information about your OG allocation.
   *
   * @example
   * // Get your OG reward allocation
   * const allocation = await nftfi.rewards.og.allocations.get();
   * const allocation = await nftfi.rewards.og.allocations.get({ account: { address: '0x11111111' } });
   */
  async get(options) {
    try {
      if (!options?.account?.address) {
        this.#assertion.hasAddress(
          'Account address required, please provide a value in options.account.address or on sdk initialization.'
        );
      }
      const accountAddress = options?.account?.address || this.#account.getAddress();
      const response = await this.#api.get(
        {
          uri: `v0.1/rewards/og/allocations/${accountAddress}`
        },
        options?.httpOptions
      );
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
