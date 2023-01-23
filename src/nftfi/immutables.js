/**
 * @class
 * Class for working with immutables.
 */
class Immutables {
  #config;
  #contractFactory;
  #immutableContract;
  #account;
  #error;
  #result;

  constructor(options) {
    this.#config = options?.config;
    this.#account = options?.account;
    this.#error = options?.error;
    this.#result = options?.result;
    this.#contractFactory = options?.contractFactory;
    this.#immutableContract = this.#contractFactory.create({
      address: this.#config.immutable.v1.address,
      abi: this.#config.immutable.v1.abi
    });
  }

  /**
   * Unseal an immutable.
   *
   * @param {Object} options - An object containing options for the unseal operation.
   * @param {Object} options.immutable - An object containing the ID of the immutable bundle to unseal.
   * @param {string} options.immutable.id - The ID of the immutable bundle to unseal.
   *
   * @returns {Object} An object containing information about the bundle that was released from the immutable.
   *
   * @example
   * // Unseal an immutable bundle.
   * const bundle = await nftfi.immutables.unseal({
   *   immutable: { id: '123' }
   * });
   */
  unseal(options) {
    return this.#immutableContract
      .call({
        function: 'withdraw',
        args: [options.immutable.id, this.#account.getAddress()]
      })
      .then(async result => {
        const transfer = result.logs.filter(function (log) {
          return (
            log.name === 'Transfer' &&
            log.args.from.toLowerCase() === this.#config.immutable.v1.address.toLowerCase() &&
            log.args.to.toLowerCase() === this.#account.getAddress().toLowerCase()
          );
        }, this)[0];
        return this.#result.handle({
          bundle: { id: transfer.args.tokenId.toString() },
          nftfi: { contract: { name: this.#config.bundler.v1.name } }
        });
      })
      .catch(e => {
        return this.#error.handle(e);
      });
  }

  /**
   * Get an immutable.
   *
   * @param {Object} options - An object containing options for the get operation.
   * @param {Object} options.bundle - An object containing the ID of the bundle to get the corresponding immutable for.
   * @param {string} options.bundle.id - The ID of the bundle to get the corresponding immutable for.
   *
   * @returns {Object} An object containing information about an immutable.
   *
   * @example
   * // Get the corresponding immutable for a given bundle.
   * const immutable = await nftfi.immutables.get({
   *   bundle: { id: '123' }
   * });
   */
  get(options) {
    return this.#immutableContract
      .call({
        function: 'immutableOfBundle',
        args: [options.bundle.id]
      })
      .then(id =>
        this.#result.handle({
          immutable: { id: id.toString() },
          nftfi: { contract: { name: this.#config.immutable.v1.name } }
        })
      )
      .catch(e => {
        return this.#error.handle(e);
      });
  }
}

export default Immutables;
