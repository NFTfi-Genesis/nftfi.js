class LoansHelper {
  #contractFactory;
  #loanCoordinator;
  #config;
  #ethers;

  constructor(options) {
    this.#contractFactory = options?.contractFactory;
    this.#config = options?.config;
    this.#ethers = options?.ethers;
  }

  _getLoanCoordinator() {
    if (!this.#loanCoordinator) {
      this.#loanCoordinator = this.#contractFactory.create({
        address: this.#config.protocol.v3.coordinator.address,
        abi: this.#config.protocol.v3.coordinator.abi
      });
    }
    return this.#loanCoordinator;
  }

  _addFilters(options, params) {
    if (options.filters?.borrower?.address) {
      params.borrowerAddress = options.filters.borrower.address;
    }
    if (options.filters?.lender?.address) {
      params.lenderAddress = options.filters.lender.address;
    }
    if (options.filters?.nft?.addresses) {
      params.nftAddresses = options.filters.nft.addresses.join(',');
    }
    if (options.filters?.status) {
      params.status = options.filters.status;
    }

    return params;
  }

  _addSort(options, params) {
    if (options.sort?.by) {
      params.sortBy = options.sort.by;
    }
    if (options.sort?.direction) {
      params.sortDirection = options.sort.direction;
    }

    return params;
  }

  _addPagination(options, params) {
    if (options.pagination?.page) {
      params.page = options.pagination.page;
    }
    if (options.pagination?.limit) {
      params.limit = options.pagination.limit;
    }

    return params;
  }

  getParams(options) {
    let params = {};
    params = this._addFilters(options, params);
    params = this._addSort(options, params);
    params = this._addPagination(options, params);
    return params;
  }

  async getLoanData(options) {
    const loanData = await this._getLoanCoordinator().call({
      function: 'getLoanDataAndOfferType',
      args: [options.loan.id]
    });
    const offerType = this.#ethers.utils.parseBytes32String(loanData[1]);
    const loanContractAddress = loanData[0][0];
    return { offerType, loanContractAddress };
  }
}

export default LoansHelper;
