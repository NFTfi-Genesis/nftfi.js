class OffersSignatures {
  constructor(options = {}) {
    this.account = options?.account;
    this.ethers = options?.ethers;
    this.config = options?.config;
  }
  async getV1OfferSignature(options) {
    const signature = this.account.sign(
      this.ethers.utils.arrayify(
        this.ethers.utils.solidityKeccak256(
          [
            'uint256',
            'uint256',
            'uint256',
            'uint256',
            'uint256',
            'uint256',
            'uint256',
            'address',
            'address',
            'address',
            'bool',
            'uint256'
          ],
          [
            options.offer.terms.loan.principal,
            options.offer.terms.loan.repayment,
            options.offer.nft.id,
            options.offer.terms.loan.duration,
            options.offer.terms.loan.interest.bps,
            options.offer.nftfi.fee.bps,
            options.offer.lender.nonce,
            options.offer.nft.address,
            options.offer.terms.loan.currency,
            options.offer.lender.address,
            options.offer.terms.loan.interest.prorated,
            this.config.chainId
          ]
        )
      )
    );
    return signature;
  }
  async getV2OfferSignature(options) {
    const signature = this.account.sign(
      this.ethers.utils.arrayify(
        this.ethers.utils.solidityKeccak256(
          [
            'address',
            'uint256',
            'uint256',
            'address',
            'uint256',
            'address',
            'uint32',
            'uint16',
            'address',
            'uint256',
            'uint256',
            'address',
            'uint256'
          ],
          [
            options.offer.terms.loan.currency,
            options.offer.terms.loan.principal,
            options.offer.terms.loan.repayment,
            options.offer.nft.address,
            options.offer.nft.id,
            options.offer.referrer.address,
            options.offer.terms.loan.duration,
            options.offer.nftfi.fee.bps,
            this.account.address,
            options.offer.lender.nonce,
            options.offer.terms.loan.expiry,
            this.config.loan.fixed.v2.address,
            this.config.chainId
          ]
        )
      )
    );
    return signature;
  }
}

module.exports = OffersSignatures;
