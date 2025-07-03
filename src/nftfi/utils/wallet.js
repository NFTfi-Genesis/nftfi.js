class UtilsWallet {
  #result;
  #error;
  #provider;

  constructor(options = {}) {
    this.#result = options?.result;
    this.#error = options?.error;
    this.#provider = options?.provider;
  }

  async reverseEnsLookup(options) {
    try {
      const ensName = await this.#provider.lookupAddress(options.address);
      return this.#result.handle({
        ens: ensName || null
      });
    } catch (e) {
      return this.#error.handle(e, null, options);
    }
  }

  async ensLookup(options) {
    try {
      const address = await this.#provider.resolveName(options.ensName);
      return this.#result.handle({
        address: address || null
      });
    } catch (e) {
      return this.#error.handle(e, null, options);
    }
  }
}

export default UtilsWallet;
