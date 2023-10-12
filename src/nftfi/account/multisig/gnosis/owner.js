class MultisigGnosisOwner {
  #ethers;
  #privateKey;
  #config;
  #multisig;
  #provider;
  #EthersAdapter;
  #Safe;

  constructor(options) {
    this.#multisig = options?.multisig;
    this.#config = options?.config;
    this.#ethers = options?.ethers;
    this.#privateKey = options?.privateKey;
    this.#provider = options?.provider;
    this.#EthersAdapter = options?.EthersAdapter;
    this.#Safe = options?.Safe;
  }

  getPrivateKey() {
    return this.#privateKey;
  }

  getAddress() {
    return this.#ethers.utils.computeAddress(this.#privateKey);
  }

  getSafeSDK() {
    const safeAddress = this.#multisig.safe.address;
    const signer = new this.#ethers.Wallet(this.getPrivateKey(), this.#provider);
    const ethAdapter = new this.#EthersAdapter.default({
      ethers: this.#ethers,
      signerOrProvider: signer
    });
    const safeSDK = this.#Safe.default.create({
      ethAdapter,
      safeAddress
    });
    return safeSDK;
  }

  async sign(msg) {
    // expects that msg is Uint8Array
    const verifyingContract = this.#multisig.safe.address;
    const chainId = this.#config.chainId;
    const SafeMessage = [{ type: 'bytes', name: 'message' }];
    const message = this.#ethers.utils.hashMessage(msg);
    let hash = await this.#ethers.utils._TypedDataEncoder.hash(
      { verifyingContract, chainId },
      { SafeMessage },
      { message }
    );
    let wallet = new this.#ethers.Wallet(this.getPrivateKey());
    let signature = (await wallet.signMessage(this.#ethers.utils.arrayify(hash)))
      .replace(/1b$/, '1f')
      .replace(/1c$/, '20');
    return signature;
  }
}

export default MultisigGnosisOwner;
