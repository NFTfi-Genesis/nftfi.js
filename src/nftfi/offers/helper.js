class OffersHelper {
  constructor(options = {}) {
    this.BN = options?.BN;
    this.utils = options?.utils;
    this.ethers = options?.ethers;
    this.signatures = options?.offersSignatures;
    this.config = options?.config;
    this.account = options?.account;
  }
  async constructV1Offer(options) {
    const repayment = options.terms.repayment.toLocaleString('fullwide', { useGrouping: false });
    const principal = options.terms.principal.toLocaleString('fullwide', { useGrouping: false });
    const loanInterestRateForDurationInBasisPoints = new this.BN(0).notn(32).toString();
    const lenderNonce = this.utils.getNonce();
    let offer = {
      nft: {
        id: options.listing.nft.id,
        address: options.listing.nft.address
      },
      lender: {
        address: this.account.address,
        nonce: lenderNonce
      },
      borrower: {
        address: options.listing.borrower.address
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
          interest: {
            prorated: false,
            bps: loanInterestRateForDurationInBasisPoints
          }
        }
      },
      nftfi: {
        contract: {
          name: options.listing.nftfi.contract.name
        },
        fee: {
          bps: this.config.loan.adminFeeInBasisPoints
        }
      }
    };
    offer['signature'] = await this.signatures.getV1OfferSignature({
      ...options,
      offer
    });
    return offer;
  }
  async constructV2Offer(options) {
    const repayment = options.terms.repayment.toLocaleString('fullwide', { useGrouping: false });
    const principal = options.terms.principal.toLocaleString('fullwide', { useGrouping: false });
    const loanInterestRateForDurationInBasisPoints = 0;
    const lenderNonce = this.utils.getNonce();
    const expiry = this.utils.getExpiry();
    let offer = {
      nft: {
        id: options.listing.nft.id,
        address: options.listing.nft.address
      },
      lender: {
        address: this.account.address,
        nonce: lenderNonce
      },
      borrower: {
        address: options.listing.borrower.address
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
          name: options.listing.nftfi.contract.name
        },
        fee: {
          bps: this.config.loan.adminFeeInBasisPoints
        }
      }
    };
    offer['signature'] = await this.signatures.getV2OfferSignature({
      ...options,
      offer
    });
    return offer;
  }
}

module.exports = OffersHelper;
