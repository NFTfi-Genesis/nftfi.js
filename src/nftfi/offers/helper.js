class OffersHelper {
  #BN;
  #Number;
  #utils;
  #signatures;
  #config;
  #account;
  #assertion;

  constructor(options = {}) {
    this.#BN = options?.BN;
    this.#Number = options?.Number;
    this.#utils = options?.utils;
    this.#signatures = options?.offersSignatures;
    this.#config = options?.config;
    this.#account = options?.account;
    this.#assertion = options?.assertion;
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
      this.#assertion.hasAddress(
        'Please provide at least a filter from filters.lender.address.eq, filters.borrower.address.eq or filters.nft.address.'
      );
      params = { lenderAddress: this.#account.getAddress() };
    }
    if (options?.filters?.lender?.address?.eq) {
      return { ...params, lenderAddress: options?.filters?.lender?.address?.eq };
    }
    if (options?.filters?.lender?.address?.ne) {
      return { ...params, lenderAddressNe: options?.filters?.lender?.address?.ne };
    }

    return params;
  }

  _addBorrower(options, params) {
    if (options?.filters?.borrower?.address?.eq) {
      return { ...params, borrowerAddress: options.filters.borrower.address.eq };
    }
    return params;
  }

  _addContract(options, params) {
    if (options?.filters?.nftfi?.contract?.name?.in) {
      return { ...params, contractNameIn: options.filters.nftfi.contract.name.in.join(',') };
    }
    if (options?.filters?.nftfi?.contract?.name) {
      return { ...params, contractName: options?.filters?.nftfi?.contract?.name };
    }
    return params;
  }

  _addFilters(options, params) {
    if (options?.filters?.loan?.apr?.lte) {
      params = { ...params, termsAprLte: options?.filters?.loan?.apr?.lte };
    }
    if (options?.filters?.loan?.effectiveApr?.lte) {
      params = { ...params, termsEffectiveAprLte: options?.filters?.loan?.effectiveApr?.lte };
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
    if (options?.filters?.type?.in) {
      params = { ...params, typeIn: options?.filters?.type?.in.join(',') };
    }
    if (typeof options?.filters?.type === 'string') {
      params = { ...params, type: options?.filters?.type };
    }
    if (typeof options?.filters?.interest?.prorated === 'boolean') {
      params = { ...params, interestProrated: options?.filters?.interest?.prorated };
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

  _addCountGroup(options, params) {
    if (options?.group) {
      return { ...params, group: options.group };
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
    params = this._addCountGroup(options, params);

    return params;
  }

  async constructAssetOffer(options) {
    const repayment = this.#Number(options.terms.repayment).toLocaleString('fullwide', { useGrouping: false });
    const principal = this.#Number(options.terms.principal).toLocaleString('fullwide', { useGrouping: false });
    const origination = this.#Number(options.terms.origination).toLocaleString('fullwide', {
      useGrouping: false
    });
    const lenderNonce = this.#utils.getNonce();
    const expiry = this.#utils.getExpiry(options?.terms?.expiry?.seconds);
    const type = this.#config.protocol.v3.type.asset.value;
    let offer = {
      type,
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
      terms: {
        loan: {
          duration: options.terms.duration,
          repayment: repayment,
          principal: principal,
          origination,
          currency: options.terms.currency,
          interest: { prorated: options.terms.interest.prorated },
          expiry: expiry
        }
      },
      metadata: options.metadata
    };
    offer['signature'] = await this.#signatures.getAssetOfferSignature({
      ...options,
      offer
    });
    return { ...offer, type: options.type };
  }

  async constructCollectionOffer(options) {
    const repayment = this.#Number(options.terms.repayment).toLocaleString('fullwide', { useGrouping: false });
    const principal = this.#Number(options.terms.principal).toLocaleString('fullwide', { useGrouping: false });
    const origination = this.#Number(options.terms.origination).toLocaleString('fullwide', {
      useGrouping: false
    });
    const lenderNonce = this.#utils.getNonce();
    const expiry = this.#utils.getExpiry(options?.terms?.expiry?.seconds);
    const nftId = 0;
    const type = this.#config.protocol.v3.type.collection.value;
    const isCollectionRangeOffer = 'ids' in options.nft;
    let offer = {
      type,
      nft: {
        id: nftId,
        address: options.nft.address,
        ...(options.nft?.ids && { ids: options.nft.ids })
      },
      lender: {
        address: this.#account.getAddress(),
        nonce: lenderNonce
      },
      terms: {
        loan: {
          duration: options.terms.duration,
          repayment: repayment,
          principal: principal,
          origination,
          currency: options.terms.currency,
          interest: { prorated: options.terms.interest.prorated },
          expiry: expiry
        }
      },
      metadata: options.metadata
    };
    if (!isCollectionRangeOffer) {
      offer['signature'] = await this.#signatures.getCollectionOfferSignature({
        ...options,
        offer
      });
    } else {
      offer['signature'] = await this.#signatures.getCollectionRangeOfferSignature({
        ...options,
        offer
      });
    }
    return { ...offer, type: options.type };
  }
}

export default OffersHelper;
