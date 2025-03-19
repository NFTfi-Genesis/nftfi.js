class CryptoPunks {
  #config;
  #contractFactory;
  #contract;

  constructor(options) {
    this.#config = options?.config;
    this.#contractFactory = options?.contractFactory;
  }

  get _contract() {
    if (!this.#contract) {
      this.#contract = this.#contractFactory.create({
        address: this.#config.nft.cryptoPunks.address,
        abi: this.#config.nft.cryptoPunks.abi
      });
    }
    return this.#contract;
  }

  _getContractAddress(contractName) {
    switch (contractName) {
      case 'v2-1.loan.fixed':
        return this.#config.loan.fixed.v2_1.address;
      case 'v2-3.loan.fixed':
        return this.#config.loan.fixed.v2_3.address;
      case 'v2.loan.fixed.collection':
        return this.#config.loan.fixed.collection.v2.address;
      case 'v2-3.loan.fixed.collection':
        return this.#config.loan.fixed.collection.v2_3.address;
      case 'v1.bundler':
        return this.#config.bundler.v1.address;
      case 'v1-1.bundler':
        return this.#config.bundler.v1_1.address;
      case 'v1.bundler.migrate':
        return this.#config.bundler.migrate.v1.address;
      case 'loan.refinance':
        return this.#config.loan.refinance.address;
      case 'v3.refinance.v1':
        return this.#config.protocol.v3.refinance.v1.address;
      case 'v3.escrow.v1':
        return this.#config.protocol.v3.escrow.v1.address;
    }
  }

  async approve(options) {
    const punkIndex = options.token.id;
    const minSalePriceInWei = 0;
    const toAddress = this._getContractAddress(options.nftfi.contract.name);
    const result = await this._contract.call({
      function: 'offerPunkForSaleToAddress',
      args: [punkIndex, minSalePriceInWei, toAddress]
    });
    const success = result?.status === 1;
    return success;
  }

  async isApproved(options) {
    const buyer = this._getContractAddress(options.nftfi.contract.name).toLowerCase();
    const result = await this._contract.call({
      function: 'punksOfferedForSale',
      args: [options?.token?.id]
    });
    const onlySellTo = result?.onlySellTo?.toLowerCase();
    const isForSale = result?.isForSale;
    const approved = isForSale === true && onlySellTo === buyer;
    return approved;
  }

  async ownerOf(options) {
    const punkIndex = options.token.id;
    const address = await this._contract.call({
      function: 'punkIndexToAddress',
      args: [punkIndex]
    });
    return address;
  }
}

export default CryptoPunks;
