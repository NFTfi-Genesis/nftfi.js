class BundlesHelper {
  #ethers;
  #config;
  #contractFactory;
  #registryContract;

  constructor(options = {}) {
    this.#ethers = options?.ethers;
    this.#config = options?.config;
    this.#contractFactory = options?.contractFactory;
    this.#registryContract = this.#contractFactory.create({
      address: this.#config.registry.address,
      abi: this.#config.registry.abi
    });
  }

  // Check if the wrapper is supported
  _isWrapperSupported(options) {
    let result = false;
    const { permit } = options;
    const permitName = this.#ethers.utils.parseBytes32String(permit);
    for (const wrapper of this.#config.registry.wrappers) {
      const name = wrapper.name;
      const isPermitted = name === permitName;
      if (isPermitted) {
        result = true;
        break;
      }
    }
    return result;
  }

  // Check if the wrapper is permitted
  _isWrapperPermitted(options) {
    const { permit } = options;
    const isPermitted = permit === this.#ethers.constants.HashZero ? false : true;
    return isPermitted;
  }

  // Check if wrapper is safe transferable
  _isWrapperSafeTransferable(options) {
    const { permit } = options;
    const permitName = this.#ethers.utils.parseBytes32String(permit);
    const wrapper = this.#config.registry.wrappers.filter(function (wrapper) {
      return wrapper?.name === permitName;
    })[0];
    const isSafeTransferable = wrapper?.safeTransfer === true ? true : false;
    return isSafeTransferable;
  }

  async getPermit(options) {
    const permit = await this.#registryContract.call({
      function: 'getNFTPermit',
      args: [options?.element?.token?.address]
    });
    const isPermitted = this._isWrapperPermitted({ permit });
    const isSupported = this._isWrapperSupported({ permit });
    const isSafeTransferable = this._isWrapperSafeTransferable({ permit });
    return {
      isPermitted,
      isSupported,
      isSafeTransferable
    };
  }
}

export default BundlesHelper;
