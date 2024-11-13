/**
 * @class
 * Class for working with loans.
 */
class Loans {
  #api;
  #account;
  #loanCoordinator;
  #fixed;
  #assetOffer;
  #collectionOffer;
  #config;
  #helper;
  #contractFactory;
  #ethers;
  #assertion;
  #validation;
  #result;
  #error;

  constructor(options = {}) {
    this.#result = options?.result;
    this.#api = options?.api;
    this.#config = options?.config;
    this.#account = options?.account;
    this.#fixed = options?.fixed;
    this.#assetOffer = options?.assetOffer;
    this.#collectionOffer = options?.collectionOffer;
    this.#helper = options?.helper;
    this.#contractFactory = options?.contractFactory;
    this.#ethers = options?.ethers;
    this.#validation = options?.validation;
    this.#assertion = options?.assertion;
    this.#error = options?.error;
  }

  get _loanCoordinator() {
    if (!this.#loanCoordinator) {
      this.#loanCoordinator = this.#contractFactory.create({
        address: this.#config.protocol.v3.coordinator.address,
        abi: this.#config.protocol.v3.coordinator.abi
      });
    }
    return this.#loanCoordinator;
  }

  async _getLoanData(options) {
    const loanData = await this._loanCoordinator.call({
      function: 'getLoanDataAndOfferType',
      args: [options.loan.id]
    });
    const offerType = this.#ethers.utils.parseBytes32String(loanData[1]);
    const loanContractAddress = loanData[0][0];
    return { offerType, loanContractAddress };
  }

  /**
   * Gets loans by specific filters.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {object} options.filters - Hashmap of filter options for this method
   * @param {string} options.filters.status - Loan status: `active`, `defaulted`, `repaid` or `liquidated`
   * @param {string} [options.filters.borrower.address] - Address of the borrower
   * @param {string} [options.filters.lender.address] - Address of the lender
   * @param {string} [options.filters.nft.addresses] - Array of NFT addresses being used as collateral
   * @param {object} [options.sort] - Hashmap of config sorting options for this method
   * @param {string} [options.sort.by] - Field to sort by `repayment`, `interest`, `apr`, `duration`, `dueDate`, `nftName`
   * @param {string} [options.sort.direction] - Sort direction: `asc` or `desc`
   * @param {object} [options.pagination] - Hashmap of pagination options for this method
   * @param {number} [options.pagination.page] - Page number
   * @param {number} [options.pagination.limit] - Number of results per page
   * @returns {Array<object>} Array of listing objects
   *
   * @example
   * // Get `active` loans where your account is the `lender`
   * const { data: { results } } = await nftfi.loans.get({
   *   filters: {
   *     lender: {
   *       address: nftfi.account.getAddress()
   *     },
   *     status: 'active'
   *   }
   * });
   *
   * @example
   * // Get `defaulted` loans that your account is either `lender` or `borrower`
   * const { data: { results } } = await nftfi.loans.get({
   *   filters: {
   *     lender: {
   *       address: nftfi.account.getAddress()
   *     },
   *     borrower: {
   *       address: nftfi.account.getAddress()
   *     },
   *     status: 'defaulted'
   *   },
   *   pagination: {
   *    page: 1,
   *    limit: 10
   *   }
   * });
   *
   * @example
   * // Get `repaid` loans that used one of the specified `nft addresses`
   * const { data: { results } } = await nftfi.loans.get({
   *   filters: {
   *     nft: {
   *       addresses: ['0x0', '0x1']
   *     },
   *     status: 'repaid'
   *   },
   *  sort: {
   *    by: 'repayment',
   *    direction: 'desc'
   *  },
   * });
   */
  async get(options = {}) {
    try {
      const response = await this.#api.get({
        uri: 'v0.2/loans',
        params: this.#helper.getParams(options)
      });

      return this.#result.handle(response);
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Begin a loan. Called by the borrower when accepting a lender's offer.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {object} options.type - Type of the offer `v3.asset` or v3.collection`
   * @param {string} options.offer.nft.address - Address of the NFT being used as collateral
   * @param {string} [options.offer.nft.id] - ID of NFT being used as collateral
   * @param {number} [options.offer.nft.ids.from] - "from" ID of NFT id range of the offer (only when accepting a ranged offer)
   * @param {number} [options.offer.nft.ids.to] - "to" ID of NFT id range of the offer (only when accepting a ranged offer)
   * @param {string} options.offer.terms.loan.currency - Address of the ERC20 contract being used as principal/interest
   * @param {number} options.offer.terms.loan.principal - Sum of money transferred from lender to borrower at the beginning of the loan
   * @param {number} options.offer.terms.loan.repayment - Maximum amount of money that the borrower would be required to retrieve their collateral
   * @param {number} options.offer.terms.loan.origination - Sum of money transferred to the lender at the beginning of the loan
   * @param {number} options.offer.terms.loan.duration - Amount of time (measured in seconds) that may elapse before the lender can liquidate the loan
   * @param {number} options.offer.terms.loan.expiry.seconds - Timestamp (in seconds) of when the signature expires
   * @param {string} [options.borrower.address] - The address of the borrower (owner of nft)
   * @param {string} options.offer.lender.address - Address of the lender that signed the offer
   * @param {string} options.offer.lender.nonce - Nonce used by the lender when they signed the offer
   * @param {number} [options.offer.nftfi.fee.bps] - Percent (measured in basis points) of the interest earned that will be taken as a fee by the contract admins when the loan is repaid
   * @param {string} [options.offer.nftfi.contract.name] - Name of contract used to facilitate the loan: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
   * @param {string} options.offer.signature - ECDSA signature of the lender
   * @returns {object} Response object
   *
   * @example
   * // Begin a loan on v3 offer
   * const result = await nftfi.loans.begin({
   *   type: 'v3.asset',
   *   nft: { address: '0x22222222', id: '2' },
   *   borrower: { address: '0x11111111' },
   *   lender: { address: '0x22222222' },
   *   terms: {
   *     principal: '1000000000000000000',
   *     repayment: '1100000000000000000',
   *     origination: '100000000000000000',
   *     interest: { prorated: true },
   *     duration: 31536000,
   *     currency: '0x00000000',
   *     expiry: { seconds: 1722260287 }
   *   },
   *   signature: "0x000000000"
   * });
   */
  async begin(options) {
    try {
      this.#assertion.hasSigner();
      let errors;
      let response;
      const contractName = options?.offer?.nftfi?.contract?.name;
      const offerType = options?.offer?.type;
      if (offerType) {
        switch (offerType) {
          case this.#config.protocol.v3.type.asset.name: {
            let success = await this.#assetOffer.v1.acceptOffer(options);
            response = { success };
            break;
          }
          case this.#config.protocol.v3.type.collection.name: {
            let success = await this.#collectionOffer.v1.acceptOffer(options);
            response = { success };
            break;
          }
          default: {
            errors = { 'type': [`${offerType} not supported`] };
            response = { errors };
            break;
          }
        }
      } else {
        switch (contractName) {
          case 'v2-3.loan.fixed': {
            let success = await this.#fixed.v2_3.acceptOffer(options);
            response = { success };
            break;
          }
          case 'v2-3.loan.fixed.collection': {
            let success = await this.#fixed.collection.v2_3.acceptOffer(options);
            response = { success };
            break;
          }

          default: {
            errors = { 'nftfi.contract.name': [`${contractName} not supported`] };
            response = { errors };
            break;
          }
        }
      }
      return response;
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Liquidate `defaulted` loans in which your account is a participant.
   * Can be called once a loan has finished its duration and the borrower still has not repaid.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.loan.id - The ID of the loan being liquidated
   * @param {string} [options.nftfi.contract.name] - Name of contract used to facilitate the liquidation: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
   * @returns {object} Response object
   *
   * @example
   * // Liquidate a v3 loan
   * const result = await nftfi.loans.liquidate({
   *   loan: { id: 1 },
   * });
   *
   * @example
   * // Liquidate a v2 loan
   * const result = await nftfi.loans.liquidate({
   *   loan: { id: 2 },
   *   nftfi: {
   *     contract: {
   *       name: 'v2-3.loan.fixed'
   *     }
   *   }
   * });
   */
  async liquidate(options) {
    try {
      this.#assertion.hasSigner();
      let success = false;
      const contractName = options?.nftfi?.contract?.name;
      if (!contractName || contractName.includes('v3')) {
        const { offerType, loanContractAddress } = await this._getLoanData(options);
        switch (offerType) {
          case this.#config.protocol.v3.type.asset.value: {
            success = await this.#assetOffer.v1.liquidateOverdueLoan({ ...options, loanContractAddress });
            break;
          }
          case this.#config.protocol.v3.type.collection.value: {
            success = await this.#collectionOffer.v1.liquidateOverdueLoan({ ...options, loanContractAddress });
            break;
          }
        }
      } else {
        switch (contractName) {
          case 'v1.loan.fixed':
            success = await this.#fixed.v1.liquidateOverdueLoan({
              loan: { id: options.loan.id }
            });
            break;
          case 'v2.loan.fixed':
            success = await this.#fixed.v2.liquidateOverdueLoan({
              loan: { id: options.loan.id }
            });
            break;
          case 'v2.loan.fixed.collection':
            success = await this.#fixed.collection.v2.liquidateOverdueLoan({
              loan: { id: options.loan.id }
            });
            break;
          case 'v2-3.loan.fixed.collection':
            success = await this.#fixed.collection.v2_3.liquidateOverdueLoan({
              loan: { id: options.loan.id }
            });
            break;
          case 'v2-1.loan.fixed':
            success = await this.#fixed.v2_1.liquidateOverdueLoan({
              loan: { id: options.loan.id }
            });
            break;
          case 'v2-3.loan.fixed':
            success = await this.#fixed.v2_3.liquidateOverdueLoan({
              loan: { id: options.loan.id }
            });
            break;
        }
      }
      return {
        success
      };
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Repay a loan. Can be called at any time after the loan has begun and before loan expiry.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.loan.id - The ID of the loan being repaid
   * @param {string} [options.nftfi.contract.name] - Name of contract used to facilitate the repayment: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
   * @returns {object} Response object
   *
   * @example
   * // Repay a v3 loan
   * const result = await nftfi.loans.repay({
   *   loan: { id: 1 }
   * });
   *
   * @example
   * // Repay a v2 loan
   * const result = await nftfi.loans.repay({
   *   loan: { id: 2 },
   *   nftfi: {
   *     contract: {
   *       name: 'v2-3.loan.fixed.collection'
   *     }
   *   }
   * });
   */
  async repay(options) {
    try {
      this.#assertion.hasSigner();
      let success = false;
      const contractName = options?.nftfi?.contract?.name;
      if (!contractName || contractName.includes('v3')) {
        const { offerType, loanContractAddress } = await this._getLoanData(options);
        switch (offerType) {
          case this.#config.protocol.v3.type.asset.value:
            success = await this.#assetOffer.v1.payBackLoan({ ...options, loanContractAddress });
            break;
          case this.#config.protocol.v3.type.collection.value:
            success = await this.#collectionOffer.v1.payBackLoan({ ...options, loanContractAddress });
            break;
        }
      } else {
        switch (contractName) {
          case 'v1.loan.fixed':
            success = await this.#fixed.v1.payBackLoan({
              loan: { id: options.loan.id }
            });
            break;
          case 'v2.loan.fixed':
            success = await this.#fixed.v2.payBackLoan({
              loan: { id: options.loan.id }
            });
            break;
          case 'v2-1.loan.fixed':
            success = await this.#fixed.v2_1.payBackLoan({
              loan: { id: options.loan.id }
            });
            break;
          case 'v2-3.loan.fixed':
            success = await this.#fixed.v2_3.payBackLoan({
              loan: { id: options.loan.id }
            });
            break;
          case 'v2.loan.fixed.collection':
            success = await this.#fixed.collection.v2.payBackLoan({
              loan: { id: options.loan.id }
            });
            break;
          case 'v2-3.loan.fixed.collection':
            success = await this.#fixed.collection.v2_3.payBackLoan({
              loan: { id: options.loan.id }
            });
            break;
        }
      }
      return {
        success
      };
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Refinance a given loan.
   *
   * @param {Object} options - The options object containing the loan and offer information.
   * @param {Object} options.loan - The loan being refinanced.
   * @param {Object} options.offer - The offer being used to refinance the loan.
   * @returns {object} Response object
   *
   * @example
   * // Fetch active loans
   * const loans = await borrower.loans.get({
   *   filters: { status: 'active' }
   * });
   * const loan = loans.data.results[0];
   *
   * // Get a v3 offer
   * const offers = await borrower.offers.get({
   *   filters: {
   *     nft: { address: loan.nft.address },
   *     loan: { currency: { address: { eq: loan.terms.loan.currency } } },
   *     type: 'v3.collection'
   *   }
   * });
   * const offer = offers[0];
   *
   * // Mint Obligation Receipt
   * await nftfi.loans.mintObligationReceipt({ loan });
   *
   * // Allow the contract to manage your ORs
   * await borrower.nft.approve({
   *   token: { address: nftfi.config.protocol.v3.obligationReceipt.v1.address },
   *   nftfi: { contract: { name: 'v3.refinance.v1' } }
   * });
   *
   * // If the refinancing proceed is negative, also allow the contract to manage your ERC20 to pay the proceed
   * await borrower.erc20.approveMax({
   *   token: { address: borrower.config.erc20.weth.address },
   *   nftfi: { contract: { name: 'v3.refinance.v1' } }
   * });
   *
   * // Refinance
   * const result = await borrower.loans.refinance({
   *   loan,
   *   offer: {
   *     ...offer,
   *     nft: { ...offer.nft, id: NFT_ID }
   *   }
   * });
   */
  async refinance(options) {
    try {
      this.#assertion.hasSigner();
      await this.#validation.refinance.validateCurrencies(options);
      let error;
      let response;
      const contractName = options?.offer?.nftfi?.contract?.name;
      if (!contractName) {
        switch (options.offer.type) {
          case this.#config.protocol.v3.type.asset.name: {
            let success = await this.#assetOffer.v1.refinanceLoan({
              loan: options.loan,
              offer: options.offer
            });
            response = { success };
            break;
          }
          case this.#config.protocol.v3.type.collection.name: {
            let success = await this.#collectionOffer.v1.refinanceCollectionOfferLoan({
              loan: options.loan,
              offer: options.offer
            });
            response = { success };
            break;
          }
          default: {
            error = { 'type': [`${options.offer.type} not supported`] };
            throw error;
          }
        }
      } else {
        switch (contractName) {
          case 'v2-1.loan.fixed': {
            let success = await this.#fixed.v2_1.refinanceLoan({
              loan: options.loan,
              offer: options.offer
            });
            response = { success };
            break;
          }
          case 'v2-3.loan.fixed': {
            let success = await this.#fixed.v2_3.refinanceLoan({
              loan: options.loan,
              offer: options.offer
            });
            response = { success };
            break;
          }
          case 'v2.loan.fixed.collection': {
            let success = await this.#fixed.collection.v2.refinanceCollectionOfferLoan({
              loan: options.loan,
              offer: options.offer
            });
            response = { success };
            break;
          }
          case 'v2-3.loan.fixed.collection': {
            let success = await this.#fixed.collection.v2_3.refinanceCollectionOfferLoan({
              loan: options.loan,
              offer: options.offer
            });
            response = { success };
            break;
          }
          default: {
            error = { 'nftfi.contract.name': [`${contractName} not supported`] };
            throw error;
          }
        }
      }
      return this.#result.handle(response);
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Revokes an active offer made by your account.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {object} options.offer.nonce - The nonce of the offer to be deleted
   * @param {string} [options.offer.type] - Type of the offer `v3.asset` or v3.collection`
   * @param {string} [options.nftfi.contract.name] - Name of contract which the offer was created for: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
   * @returns {object} Response object
   *
   * @example
   * // Revoke a v3 offer
   * const revoked = await nftfi.loans.revoke({
   *   offer: {
   *     nonce: '1',
   *     type: 'v3.asset'
   *   }
   * });
   *
   * @example
   * // Revoke a v2 offer
   * const revoked = await nftfi.loans.revoke({
   *   offer: {
   *     nonce: '2'
   *   },
   *   nftfi: {
   *     contract: {
   *       name: 'v2-3.loan.fixed'
   *     }
   *   }
   * });
   */
  async revokeOffer(options) {
    try {
      this.#assertion.hasSigner();
      let success = false;
      const offerType = options?.offer?.type;
      if (offerType) {
        let type;
        switch (offerType) {
          case this.#config.protocol.v3.type.asset.name:
            type = this.#config.protocol.v3.type.asset.value;
            break;
          case this.#config.protocol.v3.type.collection.name:
            type = this.#config.protocol.v3.type.collection.value;
            break;
        }
        try {
          const result = await this._loanCoordinator.call({
            function: 'cancelLoanCommitment',
            args: [this.#ethers.utils.formatBytes32String(type), options.offer.nonce]
          });
          success = result?.status === 1;
        } catch (e) {
          success = false;
        }
      } else {
        switch (options.nftfi.contract.name) {
          case 'v1.loan.fixed':
            success = await this.#fixed.v1.cancelLoanCommitmentBeforeLoanHasBegun({
              offer: { nonce: options.offer.nonce }
            });
            break;
          case 'v2.loan.fixed':
            success = await this.#fixed.v2.cancelLoanCommitmentBeforeLoanHasBegun({
              offer: { nonce: options.offer.nonce }
            });
            break;
          case 'v2-1.loan.fixed':
            success = await this.#fixed.v2_1.cancelLoanCommitmentBeforeLoanHasBegun({
              offer: { nonce: options.offer.nonce }
            });
            break;
          case 'v2-3.loan.fixed':
            success = await this.#fixed.v2_3.cancelLoanCommitmentBeforeLoanHasBegun({
              offer: { nonce: options.offer.nonce }
            });
            break;
          case 'v2.loan.fixed.collection':
            success = await this.#fixed.collection.v2.cancelLoanCommitmentBeforeLoanHasBegun({
              offer: { nonce: options.offer.nonce }
            });
            break;
          case 'v2-3.loan.fixed.collection':
            success = await this.#fixed.collection.v2_3.cancelLoanCommitmentBeforeLoanHasBegun({
              offer: { nonce: options.offer.nonce }
            });
            break;
        }
      }
      return {
        success
      };
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Mints an obligation receipt for a given loan.
   *
   * @param {Object} options - The options object containing the loan details and contract information.
   * @param {number} options.loan.nftfi.id - The ID of the loan.
   * @param {string} [options.loan.nftfi.contract.name] - Name of contract used to facilitate the loan: `v2-1.loan.fixed`, `v2-3.loan.fixed`, `v2.loan.fixed.collection`, `v2-3.loan.fixed.collection`
   * @returns {object} Response object
   *
   * @example
   * // Mint an Obligation Receipt for a v3 loan
   * const response = await nftfi.loans.mintObligationReceipt({
   *   loan: { id: '1' }
   * });
   *
   * @example
   * // Mint an Obligation Receipt for a v2 loan
   * const response = await nftfi.loans.mintObligationReceipt({
   *   loan: {
   *     id: '2',
   *     nftfi: {
   *       contract: {
   *         name: 'v2-3.loan.fixed'
   *       }
   *     }
   *   },
   * });
   */
  async mintObligationReceipt(options) {
    try {
      this.#assertion.hasSigner();
      let error;
      let response;
      const contractName = options?.loan?.nftfi?.contract?.name;
      if (!contractName || contractName.includes('v3')) {
        const { offerType, loanContractAddress } = await this._getLoanData(options);
        switch (offerType) {
          case this.#config.protocol.v3.type.asset.value: {
            let success = await this.#assetOffer.v1.mintObligationReceipt({ ...options, loanContractAddress });
            response = { success };
            break;
          }
          case this.#config.protocol.v3.type.collection.value: {
            let success = await this.#collectionOffer.v1.mintObligationReceipt({ ...options, loanContractAddress });
            response = { success };
            break;
          }
          default: {
            error = { 'type': [`${offerType} not supported`] };
            throw error;
          }
        }
      } else {
        switch (contractName) {
          case 'v2-3.loan.fixed': {
            let success = await this.#fixed.v2_3.mintObligationReceipt(options);
            response = { success };
            break;
          }
          case 'v2-1.loan.fixed': {
            let success = await this.#fixed.v2_1.mintObligationReceipt(options);
            response = { success };
            break;
          }
          case 'v2-3.loan.fixed.collection': {
            let success = await this.#fixed.collection.v2_3.mintObligationReceipt(options);
            response = { success };
            break;
          }
          case 'v2.loan.fixed.collection': {
            let success = await this.#fixed.collection.v2.mintObligationReceipt(options);
            response = { success };
            break;
          }
          default: {
            error = { 'nftfi.contract.name': [`${contractName} not supported`] };
            throw error;
          }
        }
      }
      return this.#result.handle(response);
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Mints an promissory note for a given loan.
   *
   * @param {Object} options - The options object containing the loan details and contract information.
   * @param {number} options.loan.nftfi.id - The ID of the loan.
   * @returns {object} Response object
   *
   * @example
   * // Mint an Promissory Note for a v3 loan
   * const response = await nftfi.loans.mintObligationReceipt({
   *   loan: { id: '1' }
   * });
   */
  async mintPromissoryNote(options) {
    try {
      this.#assertion.hasSigner();
      let error;
      let response;
      const { offerType, loanContractAddress } = await this._getLoanData(options);
      switch (offerType) {
        case this.#config.protocol.v3.type.asset.value: {
          let success = await this.#assetOffer.v1.mintPromissoryNote({ ...options, loanContractAddress });
          response = { success };
          break;
        }
        case this.#config.protocol.v3.type.collection.value: {
          let success = await this.#collectionOffer.v1.mintPromissoryNote({ ...options, loanContractAddress });
          response = { success };
          break;
        }
        default: {
          error = { 'type': [`${offerType} not supported`] };
          throw error;
        }
      }
      return this.#result.handle(response);
    } catch (e) {
      return this.#error.handle(e);
    }
  }
}

export default Loans;
