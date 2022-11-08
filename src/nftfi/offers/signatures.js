class OffersSignatures {
  #account;
  #ethers;
  #config;

  constructor(options = {}) {
    this.#account = options?.account;
    this.#ethers = options?.ethers;
    this.#config = options?.config;
  }

  async getV2OfferSignature(options) {
    const signature = this.#account.sign(
      this.#ethers.utils.arrayify(
        this.#ethers.utils.solidityKeccak256(
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
            this.#account.getAddress(),
            options.offer.lender.nonce,
            options.offer.terms.loan.expiry,
            this.#config.loan.fixed.v2_1.address,
            this.#config.chainId
          ]
        )
      )
    );
    return signature;
  }

  async getV2FixedCollectionOfferSignature(options) {
    const signature = this.#account.sign(
      this.#ethers.utils.arrayify(
        this.#ethers.utils.solidityKeccak256(
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
            this.#account.getAddress(),
            options.offer.lender.nonce,
            options.offer.terms.loan.expiry,
            this.#config.loan.fixed.collection.v2.address,
            this.#config.chainId
          ]
        )
      )
    );
    return signature;
  }
}

export default OffersSignatures;
