class OffersSignatures {
  #account;
  #ethers;
  #config;

  constructor(options = {}) {
    this.#account = options?.account;
    this.#ethers = options?.ethers;
    this.#config = options?.config;
  }

  async getAssetOfferSignature(options) {
    const signature = this.#account.sign(
      this.#ethers.utils.arrayify(
        this.#ethers.utils.solidityKeccak256(
          [
            'address',
            'uint256',
            'uint256',
            'address',
            'uint256',
            'uint32',
            'bool',
            'uint256',
            'address',
            'uint256',
            'uint256',
            'bytes32',
            'uint256'
          ],
          [
            options.offer.terms.loan.currency,
            options.offer.terms.loan.principal,
            options.offer.terms.loan.repayment,
            options.offer.nft.address,
            options.offer.nft.id,
            options.offer.terms.loan.duration,
            options.offer.terms.loan.interest.prorated,
            options.offer.terms.loan.origination,
            this.#account.getAddress(),
            options.offer.lender.nonce,
            options.offer.terms.loan.expiry,
            this.#ethers.utils.formatBytes32String(options.offer.type),
            this.#config.chainId
          ]
        )
      )
    );
    return signature;
  }

  async getCollectionOfferSignature(options) {
    return this.getAssetOfferSignature(options);
  }

  async getCollectionRangeOfferSignature(options) {
    const signature = this.#account.sign(
      this.#ethers.utils.arrayify(
        this.#ethers.utils.solidityKeccak256(
          [
            'address',
            'uint256',
            'uint256',
            'address',
            'uint256',
            'uint32',
            'bool',
            'uint256',
            'uint256',
            'uint256',
            'address',
            'uint256',
            'uint256',
            'bytes32',
            'uint256'
          ],
          [
            options.offer.terms.loan.currency,
            options.offer.terms.loan.principal,
            options.offer.terms.loan.repayment,
            options.offer.nft.address,
            options.offer.nft.id,
            options.offer.terms.loan.duration,
            options.offer.terms.loan.interest.prorated,
            options.offer.terms.loan.origination,
            options.offer.nft.ids.from,
            options.offer.nft.ids.to,
            this.#account.getAddress(),
            options.offer.lender.nonce,
            options.offer.terms.loan.expiry,
            this.#ethers.utils.formatBytes32String(options.offer.type),
            this.#config.chainId
          ]
        )
      )
    );
    return signature;
  }

  async getV3RenegotiationOfferSignature(options) {
    const hash = this.#ethers.utils.solidityKeccak256(
      [
        'uint256', // loanId
        'uint32', // newLoanDuration
        'bool', // isProRata
        'uint256', // newMaximumRepaymentAmount
        'uint256', // renegotiationFee
        'address', // lender
        'uint256', // lenderNonce
        'uint256', // expiry
        'address', // contractAddress
        'uint256' // chainId
      ],
      [
        options.loanId,
        options.newLoanDuration,
        options.isProRata,
        options.newMaximumRepaymentAmount,
        options.renegotiationFee,
        options.lender,
        options.lenderNonce,
        options.expiry,
        options.contractAddress,
        options.chainId
      ]
    );
    const signature = this.#account.sign(this.#ethers.utils.arrayify(hash));
    return signature;
  }

  async getV23RenegotiationOfferSignature(options) {
    const hash = this.#ethers.utils.solidityKeccak256(
      [
        'uint256', // loanId
        'uint32', // newLoanDuration
        'uint256', // newMaximumRepaymentAmount
        'uint256', // renegotiationFee
        'address', // lender
        'uint256', // lenderNonce
        'uint256', // expiry
        'address', // contractAddress
        'uint256' // chainId
      ],
      [
        options.loanId,
        options.newLoanDuration,
        options.newMaximumRepaymentAmount,
        options.renegotiationFee,
        options.lender,
        options.lenderNonce,
        options.expiry,
        options.contractAddress,
        options.chainId
      ]
    );
    const signature = this.#account.sign(this.#ethers.utils.arrayify(hash));
    return signature;
  }
}

export default OffersSignatures;
