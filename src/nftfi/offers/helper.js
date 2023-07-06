class OffersHelper {
  #BN;
  #Number;
  #utils;
  #signatures;
  #config;
  #account;

  constructor(options = {}) {
    this.#BN = options?.BN;
    this.#Number = options?.Number;
    this.#utils = options?.utils;
    this.#signatures = options?.offersSignatures;
    this.#config = options?.config;
    this.#account = options?.account;
  }

  _addCollectionAddress(options, params) {
    if (options?.filters?.nft?.address) {
      return { ...params, nftAddress: options.filters.nft.address };
    }
    return params;
  }

  _addNft(options, params) {
    if (options?.filters?.nft?.address && options?.filters?.nft?.id) {
      return { ...params, nftAddress: options.filters.nft.address, nftId: options.filters.nft.id };
    }
    return params;
  }

  _addLender(options, params) {
    // if no lender/borrower/collection address is provided, we default to the account address
    if (
      !options?.filters?.lender?.address?.eq &&
      !options?.filters?.borrower?.address?.eq &&
      !options?.filters?.nft?.address
    ) {
      params = { lenderAddress: this.#account.getAddress() };
    }
    // you can eq or ne but not both, should we allow both ? not needed now let's not overthink ?
    if (options?.filters?.lender?.address?.eq) {
      return { ...params, lenderAddress: options?.filters?.lender?.address?.eq };
    }
    if (options?.filters?.lender?.address?.ne) {
      return { ...params, lenderAddressNe: options?.filters?.lender?.address?.ne };
    }

    return params;
  }

  // adding filtering by borrower address so the first condition in addLender holds and in dapp we'll probably refactor the
  // "offers received as a borrower" page and that'll be useful
  _addBorrower(options, params) {
    if (options?.filters?.borrower?.address?.eq) {
      return { ...params, borrowerAddress: options.filters.borrower.address.eq };
    }
    return params;
  }

  _addContract(options, params) {
    if (options?.filters?.nftfi?.contract?.name) {
      return { ...params, contractName: options?.filters?.nftfi?.contract?.name };
    }
    return params;
  }

  _addFilters(options, params) {
    if (options?.filters?.loan?.apr?.lte) {
      params = { ...params, termsAprLte: options?.filters?.loan?.apr?.lte };
    }
    if (options?.filters?.loan?.duration?.eq) {
      params = { ...params, termsDuration: options?.filters?.loan?.duration?.eq };
    }
    if (options?.filters?.loan?.duration?.nin) {
      params = { ...params, termsDurationNin: options?.filters?.loan?.duration?.nin?.join(',') };
    }
    if (options?.filters?.loan?.currency?.address?.eq) {
      params = { ...params, termsCurrencyAddress: options?.filters?.loan?.currency?.address?.eq };
    }
    return params;
  }

  _addPagination(options, params) {
    if (options?.pagination) {
      const limit = options?.pagination?.limit || this.#config.pagination.limit;
      const page = options?.pagination?.page || this.#config.pagination.page;
      const sort = options?.pagination?.sort || null;
      const direction = options?.pagination?.direction || null;
      if (sort && direction) {
        return { ...params, page, limit, sort, direction };
      }
      return { ...params, page, limit };
    }
    return params;
  }

  getParams(options) {
    let params = {};
    params = this._addCollectionAddress(options, params);
    params = this._addNft(options, params);
    params = this._addLender(options, params);
    params = this._addBorrower(options, params);
    params = this._addContract(options, params);
    params = this._addFilters(options, params);
    params = this._addPagination(options, params);

    return params;
  }

  async constructV2Offer(options) {
    const repayment = this.#Number(options.terms.repayment).toLocaleString('fullwide', { useGrouping: false });
    const principal = this.#Number(options.terms.principal).toLocaleString('fullwide', { useGrouping: false });
    const loanInterestRateForDurationInBasisPoints = 0;
    const lenderNonce = this.#utils.getNonce();
    const expiry = this.#utils.getExpiry(options?.terms?.expiry);
    let offer = {
      nft: {
        id: options.nft.id,
        address: options.nft.address
      },
      lender: {
        address: this.#account.getAddress(),
        nonce: lenderNonce
      },
      borrower: {
        address: options.borrower.address
      },
      referrer: {
        address: '0x0000000000000000000000000000000000000000'
      },
      terms: {
        loan: {
          duration: options.terms.duration,
          repayment: repayment,
          principal: principal,
          currency: options.terms.currency,
          expiry: expiry,
          interest: {
            prorated: false,
            bps: loanInterestRateForDurationInBasisPoints
          }
        }
      },
      nftfi: {
        contract: {
          name: options.nftfi.contract.name
        },
        fee: {
          bps: this.#config.loan.adminFeeInBasisPoints
        }
      },
      metadata: options.metadata
    };
    offer['signature'] = await this.#signatures.getV2OfferSignature({
      ...options,
      offer
    });
    return offer;
  }

  async constructV2FixedCollectionOffer(options) {
    const repayment = this.#Number(options.terms.repayment).toLocaleString('fullwide', { useGrouping: false });
    const principal = this.#Number(options.terms.principal).toLocaleString('fullwide', { useGrouping: false });
    const loanInterestRateForDurationInBasisPoints = 0;
    const lenderNonce = this.#utils.getNonce();
    const expiry = this.#utils.getExpiry(options?.terms?.expiry?.seconds);
    const nftId = 0;
    let offer = {
      nft: {
        id: nftId,
        address: options.nft.address
      },
      lender: {
        address: this.#account.getAddress(),
        nonce: lenderNonce
      },
      referrer: {
        address: '0x0000000000000000000000000000000000000000'
      },
      terms: {
        loan: {
          duration: options.terms.duration,
          repayment: repayment,
          principal: principal,
          currency: options.terms.currency,
          expiry: expiry,
          interest: {
            prorated: false,
            bps: loanInterestRateForDurationInBasisPoints
          }
        }
      },
      nftfi: {
        contract: {
          name: options.nftfi.contract.name
        },
        fee: {
          bps: this.#config.loan.adminFeeInBasisPoints
        }
      },
      metadata: options.metadata
    };
    offer.signature = await this.#signatures.getV2FixedCollectionOfferSignature({
      ...options,
      offer
    });
    return offer;
  }
}

export default OffersHelper;
