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
 * Class for working with bundles.
 */
class Bundles {
  #config;
  #contractFactory;
  #account;
  #error;
  #result;
  #helper;

  constructor(options) {
    this.#config = options?.config;
    this.#contractFactory = options?.contractFactory;
    this.#account = options?.account;
    this.#error = options?.error;
    this.#result = options?.result;
    this.#helper = options?.helper;
  }

  _getContractParams(contractName, unsupportedContractNames = []) {
    if (!unsupportedContractNames.includes(contractName)) {
      switch (contractName) {
        case 'v1.bundler':
          return {
            bundler: {
              address: this.#config.bundler.v1.address,
              abi: this.#config.bundler.v1.abi
            },
            immutable: {
              address: this.#config.immutable.v1.address,
              name: this.#config.immutable.v1.name
            },
            migrate: {
              address: this.#config.bundler.migrate.v1.address,
              abi: this.#config.bundler.migrate.v1.abi,
              empty: { function: 'decomposeAndBurnBundle' }
            }
          };
        case 'v1-1.bundler':
          return {
            bundler: {
              address: this.#config.bundler.v1_1.address,
              abi: this.#config.bundler.v1_1.abi,
              empty: { function: 'decomposeBundle' }
            },
            immutable: {
              address: this.#config.immutable.v1_1.address,
              name: this.#config.immutable.v1_1.name
            }
          };
      }
    }
    throw new ContractNameNotSupportedError(`${contractName} is not supported`);
  }

  _getMigrateContractParams(options) {
    switch (`${options?.from?.nftfi?.contract?.name}:${options?.to?.nftfi?.contract?.name}`) {
      case 'v1.bundler:v1-1.bundler': {
        return {
          migrate: {
            address: this.#config.bundler.migrate.v1.address,
            abi: this.#config.bundler.migrate.v1.abi
          },
          from: {
            address: this.#config.bundler.v1.address
          },
          to: {
            address: this.#config.bundler.v1_1.address
          }
        };
      }
    }
    throw new MigrationNotSupportedError(
      `cannot migrate from: ${options?.from?.nftfi?.contract?.name} to ${options?.to?.nftfi?.contract?.name}`
    );
  }

  /**
   * Mint a new bundle.
   *
   * @returns {Object} An object containing information about the minted bundle.
   *
   * @example
   * // Mint a new v1.1 bundle.
   * // NOTE: v1 bundles have been deprecated, therefore this method wont mint a v1 bundle anymore.
   * const bundle = await nftfi.bundles.mint();
   */
  async mint() {
    let result;
    try {
      const contractName = this.#config.bundler.v1_1.name;
      const contractFactoryParams = this._getContractParams(contractName);
      const bundlerContract = this.#contractFactory.create(contractFactoryParams.bundler);

      result = await bundlerContract.call({
        function: 'safeMint',
        args: [this.#account.getAddress()]
      });
      const transfer = result.logs.filter(function (log) {
        return log.name === 'Transfer';
      })[0];
      const bundleId = transfer.args.tokenId.toString();
      return this.#result.handle({
        bundle: { id: bundleId },
        nftfi: { contract: { name: contractName } }
      });
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Adds elements to a bundle.
   *
   * @param {Object} options - An object containing options for the add operation.
   * @param {string} options.bundle.id - The ID of the bundle to which elements will be added.
   * @param {string} options.nftfi.contract.name - Name of the contract used for adding elements to the bundle.
   * @param {Array<Object>} options.elements - An array of objects representing the elements to be added.
   * @param {Object} options.elements[].token - An object containing information about the token associated with the element.
   * @param {string} options.elements[].token.address - The address of the token contract associated with the element.
   * @param {Array<string>} options.elements[].token.ids - An array of token IDs associated with the element.
   *
   * @returns {Object} An object containing information about the updated bundle.
   *
   * @example
   * // Add elements to a v1.1 bundle.
   * // NOTE: v1 bundles have been deprecated. You can migrate your v1 bundle to a v1.1 bundle using `bundles.migrate()`, then add elements afterwards.
   * const bundle = await nftfi.bundles.add({
   *   bundle: { id: '42' },
   *   elements: [
   *     { token: { address: '0xabc', ids: ['1', '2'] } },
   *     { token: { address: '0xdef', ids: ['3'] } }
   *   ],
   *   nftfi: {
   *     contract: {
   *       name: 'v1-1.bundler'
   *     }
   *   }
   * });
   */
  async add(options) {
    try {
      const contractName = options?.nftfi?.contract?.name;
      const unsupportedContractNames = ['v1.bundler'];
      const contractFactoryParams = this._getContractParams(contractName, unsupportedContractNames);
      const bundlerContract = this.#contractFactory.create(contractFactoryParams.bundler);

      // Add permit info to each element
      let elements = await Promise.all(
        options?.elements.map(async function (element) {
          const permit = await this.#helper.getPermit({ element });
          return {
            ...element,
            permit
          };
        }, this)
      );

      // Check for token.address errors
      const addressErrors = elements.reduce((acc, el) => {
        if (!el.permit.isPermitted) {
          acc.push(`${el.token.address} is not permitted`);
          return acc; //return acc early to prevent `is not supported` error
        }
        if (!el.permit.isSupported) {
          acc.push(`${el.token.address} is not supported`);
        }
        return acc;
      }, []);

      // Handle any errors
      if (addressErrors.length) {
        return this.#error.handle({ elements: { 'token.address': addressErrors } });
      }

      // Parse the inputs for the contract call
      elements = await Promise.all(
        elements.map(async function (element) {
          return {
            tokenContract: element.token.address,
            ids: element.token.ids,
            safeTransferable: element.permit.isSafeTransferable
          };
        })
      );
      // Call the contract
      await bundlerContract.call({
        function: 'addBundleElements',
        args: [options.bundle.id, elements]
      });
      // Handle the result
      return this.#result.handle({
        bundle: { id: options.bundle.id },
        elements: { added: options?.elements },
        nftfi: { contract: { name: contractName } }
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
   * Removes elements from a bundle.
   *
   * @param {Object} options - An object containing options for the remove operation.
   * @param {string} options.bundle.id - The ID of the bundle from which elements will be removed.
   * @param {string} options.nftfi.contract.name - Name of the contract used for removing elements from the bundle.
   * @param {Array<Object>} options.elements - An array of objects representing the elements to be removed.
   * @param {Object} options.elements[].token - An object containing information about the token associated with the element.
   * @param {string} options.elements[].token.address - The address of the token contract associated with the element.
   * @param {Array<string>} options.elements[].token.ids - An array of token IDs associated with the element.
   *
   * @returns {Object} An object containing information about the updated bundle.
   *
   * @example
   * // Remove elements from a v1.1 bundle.
   * const bundle = await nftfi.bundles.remove({
   *   bundle: { id: '42' },
   *   elements: [
   *     {
   *       token: {
   *         address: '0xabc',
   *         ids: ['1', '2', '3']
   *       }
   *     }
   *   ],
   *   nftfi: {
   *     contract: {
   *       name: 'v1-1.bundler'
   *     }
   *   }
   * });
   */
  async remove(options) {
    try {
      const contractName = options?.nftfi?.contract?.name;
      const contractFactoryParams = this._getContractParams(contractName);
      const bundlerContract = this.#contractFactory.create(contractFactoryParams.bundler);

      // Add permit info to each element
      let elements = await Promise.all(
        options?.elements.map(async function (element) {
          const permit = await this.#helper.getPermit({ element });
          return {
            ...element,
            permit
          };
        }, this)
      );
      // Parse the inputs for the contract call
      elements = elements.map(function (element) {
        return {
          tokenContract: element.token.address,
          ids: element.token.ids,
          safeTransferable: element.permit.isSafeTransferable
        };
      }, this);
      // Call the contract
      await bundlerContract.call({
        function: 'removeBundleElements',
        args: [options.bundle.id, elements]
      });
      // Handle the result
      return this.#result.handle({
        bundle: { id: options.bundle.id },
        elements: { removed: options?.elements },
        nftfi: { contract: { name: contractName } }
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
   * Seals a bundle, transferring it to an immutable contract, and mints a new immutable.
   *
   * @param {Object} options - An object containing options for the seal operation.
   * @param {string} options.bundle.id - The ID of the bundle to be sealed.
   * @param {string} options.nftfi.contract.name - Name of the contract used for sealing the bundle.
   *
   * @returns {Object} A promise that resolves to an object containing information about the newly minted immutable object.
   *
   * @example
   * // Seal a v1.1 bundle and mint a new v1.1 immutable.
   * // NOTE: v1 bundles have been deprecated. You can migrate your v1 bundle to a v1.1 bundle using `bundles.migrate()`, then seal afterwards.
   * const immutable = await nftfi.bundles.seal({
   *   bundle: { id: '42' },
   *   nftfi: {
   *     contract: {
   *       name: 'v1-1.bundler'
   *     }
   *   }
   * });
   */
  async seal(options) {
    try {
      const contractName = options?.nftfi?.contract?.name;
      const unsupportedContractNames = ['v1.bundler'];
      const bundlerContractFactoryParams = this._getContractParams(contractName, unsupportedContractNames);
      const bundlerContract = this.#contractFactory.create(bundlerContractFactoryParams.bundler);
      const transferred = await bundlerContract.call({
        function: 'safeTransferFrom(address,address,uint256)',
        args: [this.#account.getAddress(), bundlerContractFactoryParams.immutable.address, options.bundle.id]
      });
      const log = transferred.logs.find(log => log.name === 'ImmutableMinted');
      return this.#result.handle({
        immutable: { id: log.args.immutableId.toString() },
        nftfi: { contract: { name: bundlerContractFactoryParams.immutable.name } }
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
   * Empties a bundle, transferring its contents to your account.
   *
   * @param {Object} options - An object containing options for the empty operation.
   * @param {string} options.bundle.id - The ID of the bundle to be emptied.
   * @param {string} options.nftfi.contract.name - Name of the contract used for emptying the bundle.
   *
   * @returns {Object} An object containing the status of the empty operation.
   *
   * @example
   * // NOTE: v1 bundles are deprecated, after emptying one it will be destroyed and you will not be able to use it anymore.
   * // Approve the migration contract to handle your v1 bundle.
   * const approvalResult = await nftfi.erc721.setApprovalForAll({
   *   token: { address: nftfi.config.bundler.v1.address },
   *   nftfi: { contract: { name: 'v1.bundler.migrate' } }
   * });
   * // Empty the v1 bundle and transfer its contents to your account.
   * const response = await nftfi.bundles.empty({
   *   bundle: { id: '42' },
   *   nftfi: {
   *     contract: {
   *       name: 'v1.bundler'
   *     }
   *   }
   * });
   *
   * @example
   * // Empty a v1.1 bundle and transfer its contents to your account.
   * const response = await nftfi.bundles.empty({
   *   bundle: { id: '42' },
   *   nftfi: {
   *     contract: {
   *       name: 'v1-1.bundler'
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
        case 'v1.bundler': {
          const contract = this.#contractFactory.create(contractFactoryParams.migrate);
          response = await contract.call({
            function: contractFactoryParams.migrate.empty.function,
            args: [contractFactoryParams.bundler.address, options.bundle.id, this.#account.getAddress()]
          });
          break;
        }
        case 'v1-1.bundler': {
          const contract = this.#contractFactory.create(contractFactoryParams.bundler);
          response = await contract.call({
            function: contractFactoryParams.bundler.empty.function,
            args: [options.bundle.id, this.#account.getAddress()]
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
   * Retrieves the elements in a bundle.
   *
   * @param {Object} options - An object containing options for retrieving the elements.
   * @param {string} options.bundle.id - The ID of the bundle whose elements are to be retrieved.
   * @param {Object} options.nftfi.contract - An object containing information about the contract.
   * @param {string} options.nftfi.contract.name - Name of the contract used for retrieving the elements.
   *
   * @returns {Object} An object containing information about the bundle and its elements.
   *
   * @example
   * // Get the elements of a bundle.
   * const elements = await nftfi.bundles.elements({
   *   bundle: { id: '42' },
   *   nftfi: {
   *     contract: {
   *       name: 'v1-1.bundler'
   *     }
   *   }
   * });
   */
  elements(options) {
    try {
      const contractName = options?.nftfi?.contract?.name;
      const contractFactoryParams = this._getContractParams(contractName);
      const bundlerContract = this.#contractFactory.create(contractFactoryParams.bundler);

      return bundlerContract
        .call({
          function: 'totalChildContracts',
          args: [options.bundle.id]
        })
        .then(res => {
          const totalChildContracts = res.toNumber();
          const childContractPromises = [...Array(totalChildContracts).keys()].map(index => {
            return bundlerContract.call({
              function: 'childContractByIndex',
              args: [options.bundle.id, index]
            });
          });

          return Promise.all(childContractPromises);
        })
        .then(res => {
          const childContracts = res;
          const childContractTokenCountPromises = childContracts.map(contract => {
            return bundlerContract
              .call({
                function: 'totalChildTokens',
                args: [options.bundle.id, contract]
              })
              .then(total => ({
                contract,
                totalChildTokens: total.toNumber()
              }));
          });
          return Promise.all(childContractTokenCountPromises);
        })
        .then(res => {
          const childContracts = res;
          const elementPromises = childContracts.map(tokenContract => {
            const elementTokenIdPromises = [...Array(tokenContract.totalChildTokens).keys()].map(index => {
              return bundlerContract.call({
                function: 'childTokenByIndex',
                args: [options.bundle.id, tokenContract.contract, index]
              });
            });
            return Promise.all(elementTokenIdPromises).then(ids => {
              return {
                tokenContract: tokenContract.contract,
                ids: ids.map(id => id.toString())
              };
            });
          });
          return Promise.all(elementPromises);
        })
        .then(result => {
          const elements = result.map(function (element) {
            return {
              token: {
                address: element.tokenContract,
                ids: element.ids
              }
            };
          });
          return {
            bundle: { id: options.bundle.id },
            elements,
            nftfi: { contract: { name: contractName } }
          };
        })
        .then(result => {
          return this.#result.handle(result);
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
   * Migrates a bundle from one bundler contract to another.
   *
   * @param {Object} options - An object containing options for migrating the bundle.
   * @param {string} options.bundle.id - The ID of the bundle to be migrated.
   * @param {string} options.from.nftfi.contract.name - Name of the source contract.
   * @param {string} options.to.nftfi.contract.name - Name of the destination contract.
   *
   * @returns {Object} An object containing information about the migrated bundle.
   *
   * @example
   * // Approve the v1 bundler contract with the v1 migration contract.
   * const approvalResult = await nftfi.erc721.setApprovalForAll({
   *   token: { address: nftfi.config.bundler.v1.address },
   *   nftfi: { contract: { name: 'v1.bundler.migrate' } }
   * });
   * // Migrate a bundle from v1 bundle to v1.1 bundle.
   * const migrateResult = await nftfi.bundles.migrate({
   *   bundle: { id: '42' },
   *   from: {
   *     nftfi: {
   *       contract: {
   *         name: 'v1.bundler'
   *       }
   *     }
   *   },
   *   to: {
   *     nftfi: {
   *       contract: {
   *         name: 'v1-1.bundler'
   *       }
   *     }
   *   }
   * });
   */
  async migrate(options) {
    try {
      const bundleId = options?.bundle?.id;
      const migrateContractParams = this._getMigrateContractParams(options);
      const migrateContract = this.#contractFactory.create(migrateContractParams.migrate);
      return migrateContract
        .call({
          function: 'migrateBundle',
          args: [migrateContractParams.from.address, migrateContractParams.to.address, bundleId]
        })
        .then(result => {
          const log = result.logs.find(l => l.name === 'BundleMigrated');
          const newBundleId = log.args.newBundleId.toString();
          return this.#result.handle({
            bundle: { id: newBundleId },
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

export default Bundles;
