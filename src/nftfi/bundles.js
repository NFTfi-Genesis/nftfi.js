/**
 * @class
 * Class for working with bundles.
 */
class Bundles {
  #config;
  #contractFactory;
  #bundlerContract;
  #immutables;
  #helper;
  #account;
  #error;
  #result;

  constructor(options) {
    this.#config = options?.config;
    this.#helper = options?.helper;
    this.#account = options?.account;
    this.#error = options?.error;
    this.#result = options?.result;
    this.#immutables = options?.immutables;
    this.#contractFactory = options?.contractFactory;
    this.#bundlerContract = this.#contractFactory.create({
      address: this.#config.bundler.v1.address,
      abi: this.#config.bundler.v1.abi
    });
  }

  /**
   * Mint a new bundle.
   *
   * @example
   * // Mint a new bundle.
   * const bundle = await nftfi.bundles.mint();
   *
   * @returns {Object} An object containing information about the minted bundle.
   */
  async mint() {
    try {
      const result = await this.#bundlerContract.call({
        function: 'safeMint',
        args: [this.#account.getAddress()]
      });
      const transfer = result.logs.filter(function (log) {
        return log.name === 'Transfer';
      })[0];
      const bundleId = transfer.args.tokenId.toString();
      return this.#result.handle({
        bundle: { id: bundleId },
        nftfi: { contract: { name: this.#config.bundler.v1.name } }
      });
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Add one or more elements to a bundle.
   *
   * @param {Object} options - An object containing options for the add operation.
   * @param {Object} options.bundle - An object containing the ID of the bundle to add elements to.
   * @param {string} options.bundle.id - The ID of the bundle to add elements to.
   * @param {Object[]} options.elements - An array of objects containing information about the elements to add.
   * @param {Object} options.elements[].token - An object containing the address and IDs of the token contract and the elements to add.
   * @param {string} options.elements[].token.address - The address of the token contract.
   * @param {string[]} options.elements[].token.ids - An array of strings containing the IDs of the elements to add.
   *
   * @example
   * // Add elements from multiple token contracts to a bundle.
   * const bundle = await nftfi.bundles.add({
   *   bundle: { id: '123' },
   *   elements: [
   *     { token: { address: '0xabc', ids: ['1', '2'] } },
   *     { token: { address: '0xdef', ids: ['3'] } }
   *   ]
   * });
   *
   * @returns {Object} An object containing information about the bundle and added elements.
   */
  async add(options) {
    try {
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
      await this.#bundlerContract.call({
        function: 'addBundleElements',
        args: [options.bundle.id, elements]
      });
      // Handle the result
      return this.#result.handle({
        bundle: { id: options.bundle.id },
        elements: { added: options?.elements },
        nftfi: { contract: { name: this.#config.bundler.v1.name } }
      });
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Remove one or more elements from a bundle.
   *
   * @param {Object} options - An object containing options for the remove operation.
   * @param {Object} options.bundle - An object containing the ID of the bundle to remove elements from.
   * @param {string} options.bundle.id - The ID of the bundle to remove elements from.
   * @param {Object[]} options.elements - An array of objects containing information about the elements to remove.
   * @param {Object} options.elements[].token - An object containing the address and IDs of the token contract and the elements to remove.
   * @param {string} options.elements[].token.address - The address of the token contract.
   * @param {string[]} options.elements[].token.ids - An array of strings containing the IDs of the elements to remove.
   *
   * @returns {Object} An object containing information about the bundle and removed elements.
   *
   * @example
   * // Removes elements from multiple token contracts from a bundle.
   * const bundle = await nftfi.bundles.remove({
   *   bundle: { id: '123' },
   *   elements: [
   *     { token: { address: '0xabc', ids: ['1', '2'] } },
   *     { token: { address: '0xdef', ids: ['3'] } }
   *   ]
   * });
   */
  async remove(options) {
    try {
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
      await this.#bundlerContract.call({
        function: 'removeBundleElements',
        args: [options.bundle.id, elements]
      });
      // Handle the result
      return this.#result.handle({
        bundle: { id: options.bundle.id },
        elements: { removed: options?.elements },
        nftfi: { contract: { name: this.#config.bundler.v1.name } }
      });
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Seal a bundle, making it immutable.
   *
   * @param {Object} options - An object containing options for the seal operation.
   * @param {Object} options.bundle - An object containing the ID of the bundle to seal.
   * @param {string} options.bundle.id - The ID of the bundle to seal.
   *
   * @returns {Object} An object containing information about the immutable contract.
   *
   * @example
   * // Seals a bundle.
   * const immutable = await nftfi.bundles.seal({
   *   bundle: { id: '123' }
   * });
   */
  async seal(options) {
    try {
      await this.#bundlerContract.call({
        function: 'safeTransferFrom(address,address,uint256)',
        args: [this.#account.getAddress(), this.#config.immutable.v1.address, options.bundle.id]
      });
      const result = await this.#immutables.get({
        bundle: { id: options.bundle.id }
      });
      return this.#result.handle({
        immutable: { id: result.data.immutable.id },
        nftfi: { contract: { name: this.#config.immutable.v1.name } }
      });
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Empty a bundle.
   *
   * @param {Object} options - An object containing options for the empty operation.
   * @param {Object} options.bundle - An object containing the ID of the bundle to empty.
   * @param {string} options.bundle.id - The ID of the bundle to empty.
   *
   * @returns {Object} An object containing a success property.
   *
   * @example
   * // Empties a bundle.
   * const result = await nftfi.bundles.empty({
   *   bundle: { id: '123' }
   * });
   */
  async empty(options) {
    try {
      await this.#bundlerContract.call({
        function: 'decomposeBundle',
        args: [options.bundle.id, this.#account.getAddress()]
      });
      const result = {
        success: true
      };
      return this.#result.handle(result);
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Get the elements inside a bundle.
   *
   * @param {Object} options - An object containing options for the elements operation.
   * @param {Object} options.bundle - An object containing the ID of the bundle to get elements for.
   * @param {string} options.bundle.id - The ID of the bundle to get elements for.
   *
   * @returns {Object} An object containing information about the bundle and an array of elements.
   *
   * @example
   * // Gets the elements in a bundle.
   * const bundle = await nftfi.bundles.elements({
   *   bundle: { id: '123' }
   * });
   * console.log(bundle.data.elements);
   */
  elements(options) {
    return this.#bundlerContract
      .call({
        function: 'totalChildContracts',
        args: [options.bundle.id]
      })
      .then(res => {
        const totalChildContracts = res.toNumber();
        const childContractPromises = [...Array(totalChildContracts).keys()].map(index => {
          return this.#bundlerContract.call({
            function: 'childContractByIndex',
            args: [options.bundle.id, index]
          });
        });

        return Promise.all(childContractPromises);
      })
      .then(res => {
        const childContracts = res;
        const childContractTokenCountPromises = childContracts.map(contract => {
          return this.#bundlerContract
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
            return this.#bundlerContract.call({
              function: 'childTokenByIndex',
              args: [options.bundle.id, tokenContract.contract, index]
            });
          });
          return Promise.all(elementTokenIdPromises).then(ids => {
            return {
              tokenContract: tokenContract.contract,
              ids: ids.map(id => id.toNumber())
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
          nftfi: { contract: { name: this.#config.bundler.v1.name } }
        };
      })
      .then(result => {
        return this.#result.handle(result);
      })
      .catch(e => this.#error.handle(e));
  }
}

export default Bundles;
