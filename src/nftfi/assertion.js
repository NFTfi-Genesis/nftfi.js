class Assertion {
  #account;
  #provider;

  constructor(options = {}) {
    this.#account = options?.account;
    this.#provider = options?.provider;
  }

  hasSigner(message) {
    if (!this.#account?.getSigner()) {
      throw new Error(
        message ||
          'Authentication required, please provide values for either account.privateKey, account.multisig or web3.provider on initialization.'
      );
    }
  }

  hasAddress(message) {
    if (!this.#account?.getAddress()) {
      throw new Error(
        message ||
          'Account address required, please provide values for either account.address, account.privateKey, web3.provider or account.multisig on initialization.'
      );
    }
  }

  hasProvider(message) {
    if (!this.#provider) {
      throw new Error(
        message ||
          'Web3 provider required, please provide values for either options.ethereum.web3.provider or options.ethereum.provider.url on initialization.'
      );
    }
  }
}

export default Assertion;
