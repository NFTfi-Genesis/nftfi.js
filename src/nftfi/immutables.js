class ContractNameNotSupportedError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'ContractNameNotSupportedError';
  }
}

class MigrationNotSupportedError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'MigrationNotSupportedError';
  }
}

/**
 * @class
 * Class for working with immutables.
 */
class Immutables {
  #config;
  #contractFactory;
  #account;
  #error;
  #result;

  constructor(options) {
    this.#config = options?.config;
    this.#contractFactory = options?.contractFactory;
    this.#account = options?.account;
    this.#error = options?.error;
    this.#result = options?.result;
  }

  _getContractParams(contractName, unsupportedContracts = []) {
    const unsupportedContractNames = Object.keys(unsupportedContracts);
    if (!unsupportedContractNames.includes(contractName)) {
      switch (contractName) {
        case 'v1.immutable.bundle':
          return {
            immutable: {
              address: this.#config.immutable.v1.address,
              abi: this.#config.immutable.v1.abi
            },
            bundler: {
              name: this.#config.bundler.v1.name
            },
            migrate: {
              address: this.#config.bundler.migrate.v1.address,
              abi: this.#config.bundler.migrate.v1.abi,
              empty: { function: 'decomposeAndBurnImmutable' }
            }
          };
        case 'v1-1.immutable.bundle':
          return {
            immutable: {
              address: this.#config.immutable.v1_1.address,
              abi: this.#config.immutable.v1_1.abi,
              empty: { function: 'withdrawAndDecompose' }
            },
            bundler: {
              name: this.#config.bundler.v1_1.name
            }
          };
      }
    }
    const errorMsg = unsupportedContracts[contractName] || `${contractName} is not supported`;
    throw new ContractNameNotSupportedError(errorMsg);
  }

  _getMigrateContractParams(options) {
    switch (`${options?.from?.nftfi?.contract?.name}:${options?.to?.nftfi?.contract?.name}`) {
      case 'v1.immutable.bundle:v1-1.immutable.bundle': {
        return {
          migrate: {
            address: this.#config.bundler.migrate.v1.address,
            abi: this.#config.bundler.migrate.v1.abi
          },
          from: {
            address: this.#config.immutable.v1.address
          },
          to: {
            address: this.#config.immutable.v1_1.address
          }
        };
      }
    }
    throw new MigrationNotSupportedError(
      `cannot migrate from: ${options?.from?.nftfi?.contract?.name} to ${options?.to?.nftfi?.contract?.name}`
    );
  }

  /**
   * Unseals an immutable bundle.
   *
   * @param {Object} options - An object containing options for the unseal operation.
   * @param {string} options.immutable.id - The ID of the immutable bundle to unseal.
   * @param {Object} options.nftfi.contract - An object containing information about the contract used to facilitate the bundle.
   * @param {string} options.nftfi.contract.name - Name of the contract used to facilitate the bundle: `v1.immutable.bundle` (deprecated), `v1-1.immutable.bundle`.
   *
   * @returns {Object} An object containing information about the bundle that was released from the immutable.
   *
   * @example
   * // Unseal a v1.1 immutable bundle.
   * // NOTE: v1 immutables have been deprecated. You must call `nftfi.immutables.empty()` instead, or you can migrate your v1 immutable to a v1.1 immutable using `nftfi.immutables.migrate()`, then unseal it.
   * const bundle = await nftfi.immutables.unseal({
   *   immutable: { id: '42' },
   *   nftfi: {
   *     contract: {
   *       name: 'v1-1.immutable.bundle'
   *     }
   *   }
   * });
   */
  unseal(options) {
    try {
      const contractName = options?.nftfi?.contract?.name;
      const unsupportedConracts = {
        'v1.immutable.bundle':
          'immutables.unseal() no longer supports v1.immutable.bundle. use immutables.empty() instead'
      };
      const contractFactoryParams = this._getContractParams(contractName, unsupportedConracts);
      const immutableContract = this.#contractFactory.create(contractFactoryParams.immutable);
      return immutableContract
        .call({
          function: 'withdraw',
          args: [options.immutable.id, this.#account.getAddress()]
        })
        .then(async result => {
          const transfer = result.logs.filter(function (log) {
            return (
              log.name === 'Transfer' &&
              log.args.from.toLowerCase() === contractFactoryParams.immutable.address.toLowerCase() &&
              log.args.to.toLowerCase() === this.#account.getAddress().toLowerCase()
            );
          }, this)[0];
          return this.#result.handle({
            bundle: { id: transfer.args.tokenId.toString() },
            nftfi: { contract: { name: contractFactoryParams.bundler.name } }
          });
        })
        .catch(e => {
          return this.#error.handle(e);
        });
    } catch (e) {
      if (e instanceof ContractNameNotSupportedError) {
        return this.#error.handle({
          nftfi: { contract: { name: e.message } }
        });
      }
    }
  }

  /**
   * Retrieves a bundle of an immutable.
   *
   * @param {Object} options - An object containing options for the getBundle operation.
   * @param {string} options.immutable.id - The ID of the immutable object.
   * @param {Object} options.nftfi.contract - An object containing information about the contract used to facilitate the bundle.
   * @param {string} options.nftfi.contract.name - Name of the contract used to facilitate the bundle: `v1.immutable.bundle` (deprecated), `v1-1.immutable.bundle`.
   *
   * @returns {Object} An object containing information about an bundle.
   *
   * @example
   * // Get a bundle of a v1 immutable.
   * const bundle = await nftfi.immutables.getBundle({
   *   immutable: { id: '42' },
   *   nftfi: {
   *     contract: {
   *       name: 'v1.immutable.bundle'
   *     }
   *   }
   * });
   *
   * @example
   * // Get a bundle of a v1.1 immutable.
   * const bundle = await nftfi.immutables.getBundle({
   *   immutable: { id: '42' },
   *   nftfi: {
   *     contract: {
   *       name: 'v1-1.immutable.bundle'
   *     }
   *   }
   * });
   */
  async getBundle(options) {
    try {
      const contractName = options?.nftfi?.contract?.name;
      const contractFactoryParams = this._getContractParams(contractName);
      const immutableContract = this.#contractFactory.create(contractFactoryParams.immutable);
      const bundleId = await immutableContract.call({
        function: 'bundleOfImmutable',
        args: [options.immutable.id]
      });
      return this.#result.handle({
        bundle: { id: bundleId.toString() },
        nftfi: { contract: { name: contractFactoryParams.bundler.name } }
      });
    } catch (e) {
      if (e instanceof ContractNameNotSupportedError) {
        return this.#error.handle({
          nftfi: { contract: { name: e.message } }
        });
      } else {
        return this.#error.handle(e);
      }
    }
  }

  /**
   * Empties an immutable according to the specified contract.
   *
   * @param {Object} options - An object containing options for the empty operation.
   * @param {string} options.immutable.id - The ID of the immutable object to be emptied.
   * @param {string} options.nftfi.contract.name - Name of the contract used for emptying the immutable object: `v1.immutable.bundle`, `v1-1.immutable.bundle`.
   *
   * @returns {Object} An object containing the success status of the empty operation.
   *
   * @example
   * // NOTE: v1 immutables have been deprecated. If you empty it you will also burn the bundle after the NFTs have been transferred back into your account. You could optionally migrate your v1 immutable to a v1.1 immutable using `nftfi.immutables.migrate()`, then empty it.
   * // Approve the migration contract to handle your v1 immutable.
   * const approvalResult = await nftfi.erc721.setApprovalForAll({
   *   token: { address: nftfi.config.immutable.v1.address },
   *   nftfi: { contract: { name: 'v1.bundler.migrate' } }
   * });
   * // Empty the v1 immutable and transfer its contents to your account.
   * const result = await nftfi.immutables.empty({
   *   immutable: { id: '42' },
   *   nftfi: {
   *     contract: {
   *       name: 'v1.immutable.bundle'
   *     }
   *   }
   * });
   *
   * @example
   * // Empty an v1.1 immutable and transfer its contents to your account.
   * const result = await nftfi.immutables.empty({
   *   immutable: { id: '42' },
   *   nftfi: {
   *     contract: {
   *       name: 'v1-1.immutable.bundle'
   *     }
   *   }
   * });
   */
  async empty(options) {
    try {
      let response;
      const contractName = options?.nftfi?.contract?.name;
      const contractFactoryParams = this._getContractParams(contractName);
      switch (contractName) {
        case 'v1.immutable.bundle': {
          const contract = this.#contractFactory.create(contractFactoryParams.migrate);
          response = await contract.call({
            function: contractFactoryParams.migrate.empty.function,
            args: [contractFactoryParams.immutable.address, options.immutable.id, this.#account.getAddress()]
          });
          break;
        }
        case 'v1-1.immutable.bundle': {
          const contract = this.#contractFactory.create(contractFactoryParams.immutable);
          response = await contract.call({
            function: contractFactoryParams.immutable.empty.function,
            args: [options.immutable.id, this.#account.getAddress()]
          });
          break;
        }
      }
      const result = {
        success: response?.status === 1 || false
      };
      return this.#result.handle(result);
    } catch (e) {
      if (e instanceof ContractNameNotSupportedError) {
        return this.#error.handle({
          nftfi: { contract: { name: e.message } }
        });
      } else {
        return this.#error.handle(e);
      }
    }
  }

  /**
   * Migrates an immutable from one contract to another.
   *
   * @param {Object} options - An object containing options for the migration operation.
   * @param {string} options.immutable.id - The ID of the immutable object to be migrated.
   * @param {string} options.from.nftfi.contract.name - Name of the source immutable contract.
   * @param {string} options.to.nftfi.contract.name - Name of the destination immutable contract.
   *
   * @returns {Object} An object containing information about the migrated immutable object.
   *
   * @example
   * // Approve the v1 immutable contract with the v1 migration contract.
   * const approvalResult = await nftfi.erc721.setApprovalForAll({
   *   token: {
   *     address: nftfi.config.immutable.v1.address
   *   },
   *   nftfi: { contract: { name: 'v1.bundler.migrate' } }
   * });
   * // Migrate an immutable from a v1 contract to a v1.1 contract.
   * const migrateResult = await nftfi.immutables.migrate({
   *   immutable: { id: '42' },
   *   from: {
   *     nftfi: {
   *       contract: {
   *         name: 'v1.immutable.bundle'
   *       }
   *     }
   *   },
   *   to: {
   *     nftfi: {
   *       contract: {
   *         name: 'v1-1.immutable.bundle'
   *       }
   *     }
   *   }
   * });
   */
  async migrate(options) {
    try {
      const immutableId = options?.immutable?.id;
      const migrateContractParams = this._getMigrateContractParams(options);
      const migrateContract = this.#contractFactory.create(migrateContractParams.migrate);
      return migrateContract
        .call({
          function: 'migrateImmutable',
          args: [migrateContractParams.from.address, migrateContractParams.to.address, immutableId]
        })
        .then(result => {
          const log = result.logs.find(l => l.name === 'ImmutableMigrated');
          const newImmutableId = log.args.newImmutableId.toString();
          return this.#result.handle({
            immutable: { id: newImmutableId },
            nftfi: { contract: { name: options?.to?.nftfi?.contract?.name } }
          });
        })
        .catch(e => {
          return this.#error.handle(e);
        });
    } catch (e) {
      if (e instanceof MigrationNotSupportedError) {
        return this.#error.handle({
          nftfi: { contract: { name: e.message } }
        });
      }
    }
  }
}

export default Immutables;
