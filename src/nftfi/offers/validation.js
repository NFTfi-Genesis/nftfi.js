class OffersValidator {
  #erc20;
  #ethers;
  #config;
  #contractFactory;

  constructor(options = {}) {
    this.#erc20 = options?.erc20;
    this.#ethers = options?.ethers;
    this.#config = options?.config;
    this.#contractFactory = options?.contractFactory;
  }

  _getContractAddressAndAbi(contractName) {
    switch (contractName) {
      case 'v2-1.loan.fixed':
        return { address: this.#config.loan.fixed.v2_1.address, abi: this.#config.loan.fixed.v2_1.abi };
      case 'v2-3.loan.fixed':
        return { address: this.#config.loan.fixed.v2_3.address, abi: this.#config.loan.fixed.v2_3.abi };
      case 'v2.loan.fixed.collection':
        return {
          address: this.#config.loan.fixed.collection.v2.address,
          abi: this.#config.loan.fixed.collection.v2.abi
        };
      case 'v2-3.loan.fixed.collection':
        return {
          address: this.#config.loan.fixed.collection.v2_3.address,
          abi: this.#config.loan.fixed.collection.v2_3.abi
        };
    }
  }

  _getSigningUtilsContractAddressAndAbi(contractName) {
    switch (contractName) {
      case 'v2.loan.fixed.collection':
      case 'v2-1.loan.fixed':
        return { address: this.#config.signingUtils.v2.address, abi: this.#config.signingUtils.v2.abi };
      case 'v2-3.loan.fixed':
      case 'v2-3.loan.fixed.collection':
        return {
          address: this.#config.signingUtils.v2_3.address,
          abi: this.#config.signingUtils.v2_3.abi
        };
    }
  }

  async _isValidAllowance(options) {
    try {
      const allowance = await this.#erc20.allowance(options);
      return options?.gte?.amount && allowance.gte(options.gte.amount);
    } catch (error) {
      return error;
    }
  }

  async _isValidBalance(options) {
    try {
      const balance = await this.#erc20.balanceOf(options);
      return !(options?.gte?.amount && !balance.gte(options.gte.amount));
    } catch (error) {
      return error;
    }
  }

  async _isValidSignature(offer) {
    try {
      const { address: loanContract } = this._getContractAddressAndAbi(offer.nftfi.contract.name);
      const { address: signingUtilsContract, abi: signingUtilsContractAbi } =
        this._getSigningUtilsContractAddressAndAbi(offer.nftfi.contract.name);

      const contract = this.#contractFactory.create({
        address: signingUtilsContract,
        abi: signingUtilsContractAbi
      });

      const offerTerms = {
        loanPrincipalAmount: offer.terms.loan.principal.toLocaleString('fullwide', { useGrouping: false }),
        maximumRepaymentAmount: offer.terms.loan.repayment.toLocaleString('fullwide', { useGrouping: false }),
        nftCollateralId: offer.nft.id,
        nftCollateralContract: offer.nft.address,
        loanDuration: offer.terms.loan.duration,
        loanAdminFeeInBasisPoints: offer.nftfi.fee.bps.toString(),
        loanERC20Denomination: offer.terms.loan.currency,
        referrer: offer.referrer.address
      };
      const signature = {
        nonce: offer.lender.nonce.toString(),
        expiry: offer.terms.loan.expiry.toString(),
        signer: offer.lender.address,
        signature: offer.signature
      };

      return await contract.call({
        function: 'isValidLenderSignature',
        args: [offerTerms, signature, loanContract]
      });
    } catch (error) {
      return error;
    }
  }

  async _isValidNonce(offer) {
    try {
      const { address: loanContract, abi: loanContractAbi } = this._getContractAddressAndAbi(offer.nftfi.contract.name);
      const contract = this.#contractFactory.create({
        address: loanContract,
        abi: loanContractAbi
      });

      const isUsedNonce = await contract.call({
        function: 'getWhetherNonceHasBeenUsedForUser',
        args: [offer.lender.address, offer.lender.nonce]
      });
      return !isUsedNonce;
    } catch (error) {
      return error;
    }
  }

  _addError(key, status, type, msg, errors) {
    if (errors[key]) {
      errors[key].push({ status, type, msg });
    } else {
      errors[key] = [{ status, type, msg }];
    }
    return errors;
  }

  async validate(offer) {
    let errors = {};

    // Early return if offer is expired, no need to proceed with other async calls
    if (Date.now() > offer.terms.loan.expiry * 1000) {
      this._addError('terms.expiry', 'invalid', 'expiry', 'offer expiry is in the past', errors);
      return errors;
    }

    const contract = offer.nftfi.contract.name;
    const currency = offer.terms.loan.currency;
    const lender = offer.lender.address;
    const principalBn = this.#ethers.BigNumber.from(
      offer.terms.loan.principal.toLocaleString('fullwide', { useGrouping: false })
    );

    const isValidSignature = offer.signature ? this._isValidSignature(offer) : true;

    const isValidNonce = this._isValidNonce(offer);

    const isValidAllowance = this._isValidAllowance({
      nftfi: { contract: { name: contract } },
      account: { address: lender },
      token: { address: currency },
      gte: { amount: principalBn }
    });

    const isValidBalance = this._isValidBalance({
      nftfi: { contract: { name: contract } },
      account: { address: lender },
      token: { address: currency },
      gte: { amount: principalBn }
    });

    return Promise.all([isValidAllowance, isValidBalance, isValidSignature, isValidNonce]).then(checks => {
      let msg = '';
      let status = '';
      let type = '';

      if (checks[0] !== true) {
        type = 'erc20.allowance';
        status = checks[0] ? 'error' : 'invalid';
        msg = checks[0]
          ? 'failed to check allowance'
          : 'principal is greater than approved allowance on lender account';
        this._addError('terms.principal', status, type, msg, errors);
      }

      if (checks[1] !== true) {
        type = 'erc20.balanceOf';
        status = checks[1] ? 'error' : 'invalid';
        msg = checks[1] ? 'failed to check balance' : 'principal is greater than available funds in lender account';
        this._addError('terms.principal', status, type, msg, errors);
      }

      if (checks[2] !== true) {
        type = 'signingUtils.v2.isValidLenderSignature';
        status = checks[2] ? 'error' : 'invalid';
        msg = checks[2] ? 'failed to check signature' : 'signature is invalid or malformed';
        this._addError('signature', status, type, msg, errors);
      }

      if (checks[3] !== true) {
        type = offer.nftfi.contract.name + '.getWhetherNonceHasBeenUsedForUser';
        status = checks[3] ? 'error' : 'invalid';
        msg = checks[3] ? 'failed to check nonce' : 'lender nonce has already been used';
        this._addError('lender.nonce', status, type, msg, errors);
      }
      return Object.keys(errors).length > 0 ? errors : null;
    });
  }
}

export default OffersValidator;
