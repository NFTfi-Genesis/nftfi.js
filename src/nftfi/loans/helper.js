class LoansHelper {
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
}

export default LoansHelper;
