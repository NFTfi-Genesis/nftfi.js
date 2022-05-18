import Config from './nftfi/config.js';
import Account from './nftfi/account.js';
import Http from './nftfi/http.js';
import Utils from './nftfi/utils.js';
import Auth from './nftfi/auth.js';
import Api from './nftfi/api.js';
import Listings from './nftfi/listings.js';
import Offers from './nftfi/offers.js';
import OffersSignatures from './nftfi/offers/signatures.js';
import OffersHelper from './nftfi/offers/helper.js';
import Loans from './nftfi/loans.js';
import LoansFixed from './nftfi/loans/fixed/index.js';
import LoansFixedV1 from './nftfi/loans/fixed/v1/index.js';
import LoansFixedV2 from './nftfi/loans/fixed/v2/index.js';
import Erc20 from './nftfi/erc20.js';
import NFTfi from './nftfi/index.js';

import BN from 'bn.js';
import * as ethersjs from 'ethers';
import web3 from 'web3';
import axios from 'axios';
import merge from 'lodash.merge';

export default {
  init: async function (options = {}) {
    if (!options?.ethereum?.web3?.provider && !options?.ethereum?.provider?.url) {
      throw 'Please provide a value for the ethereum.provider.url field in the options parameter.';
    }
    if (options?.ethereum?.web3?.provider && !options?.ethereum?.account?.address) {
      throw 'Please provide a value for the ethereum.account.address field in the options parameter.';
    }
    if (!options?.ethereum?.web3?.provider && !options?.ethereum?.account?.privateKey) {
      throw 'Please provide a value for the ethereum.account.privateKey field in the options parameter.';
    }
    if (!options?.api?.key) {
      throw 'Please provide a value for the api.key field in the options parameter.';
    }

    const ethers = options?.dependencies?.ethers || ethersjs;
    const provider = options?.ethereum?.web3?.provider
      ? new ethersjs.providers.Web3Provider(options?.ethereum?.web3?.provider)
      : new ethersjs.providers.getDefaultProvider(options?.ethereum?.provider?.url);
    const network = await provider.getNetwork();
    const pk = options?.ethereum?.account?.privateKey;
    const address = options?.ethereum?.account?.address || ethersjs.utils.computeAddress(pk);
    const signer = !pk ? await provider.getSigner(address) : new ethersjs.Wallet(pk, provider);
    const account = new Account({ address, signer });
    const http = new Http({ axios });
    const utils = options?.dependencies?.utils || new Utils({ ethers, BN, Date, Math, Number, web3 });
    const config = new Config({
      merge,
      chainId: network?.chainId,
      config: {
        ...options?.config,
        api: { key: options?.api?.key }
      }
    });
    const auth = new Auth({ http, account, config, utils });
    const api = options?.dependencies?.api || new Api({ config, auth, http });
    const listings = new Listings({ api, config });
    const offersSignatures = new OffersSignatures({ account, ethers, config });
    const offersHelper = new OffersHelper({ BN, Number, utils, ethers, offersSignatures, config, account });
    const offers = new Offers({ api, account, offersHelper });
    const loanFixedV1 = new LoansFixedV1({ account, ethers, config });
    const loanFixedV2 = new LoansFixedV2({ account, ethers, config });
    const loanFixed = new LoansFixed({ v1: loanFixedV1, v2: loanFixedV2 });
    const loans = new Loans({ api, account, fixed: loanFixed });
    const erc20 = new Erc20({ config, ethers, account });
    const nftfi = new NFTfi({ config, account, listings, offers, loans, erc20, utils });

    if (options?.verbose === true) {
      console.log('NFTfi SDK initialised.');
    }

    return nftfi;
  }
};
