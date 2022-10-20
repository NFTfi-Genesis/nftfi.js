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
      }
    };
    offer['signature'] = await this.#signatures.getV2OfferSignature({
      ...options,
      offer
    });
    return offer;
  }
}

export default OffersHelper;
