const BN = require('bn.js');
const hre = require('hardhat');
const web3 = require('web3');
const axios = require('axios');
const merge = require('lodash.merge');
require('dotenv').config();

const Config = require('./nftfi/config.js');
const Account = require('./nftfi/account.js');
const Http = require('./nftfi/http.js');
const Utils = require('./nftfi/utils.js');
const Auth = require('./nftfi/auth.js');
const Api = require('./nftfi/api.js');
const Listings = require('./nftfi/listings.js');
const Offers = require('./nftfi/offers.js');
const OffersSignatures = require('./nftfi/offers/signatures.js');
const OffersHelper = require('./nftfi/offers/helper.js');
const Loans = require('./nftfi/loans.js');
const LoansFixed = require('./nftfi/loans/fixed');
const LoansFixedV1 = require('./nftfi/loans/fixed/v1');
const LoansFixedV2 = require('./nftfi/loans/fixed/v2');
const Erc20 = require('./nftfi/erc20.js');
const NFTfi = require('./nftfi/nftfi.js');

exports.init = async function (options = {}) {
  const ethers = options?.ethers || hre.ethers;
  const network = await ethers.provider.getNetwork();
  const config = new Config({
    chainId: network?.chainId,
    config: {
      ...options?.config,
      api: {
        key: process.env.API_KEY
      }
    },
    merge
  });
  const pks = {
    1: process.env.MAINNET_PRIVATE_KEY,
    4: process.env.RINKEBY_PRIVATE_KEY
  };
  const pk = pks[network?.chainId];
  const address = options?.account?.address || ethers.utils.computeAddress(pk);
  const account = new Account({ address, ethers });
  const http = new Http({ axios });
  const utils = options?.utils || new Utils({ ethers, BN, Date, web3 });
  const auth = new Auth({ http, account, config, utils });
  const api = options?.api || new Api({ config, auth, http });
  const listings = new Listings({ api, config });
  const offersSignatures = new OffersSignatures({ account, ethers, config });
  const offersHelper = new OffersHelper({ BN, Number, utils, ethers, offersSignatures, config, account });
  const offers = new Offers({ api, config, account, offersHelper });
  const loanFixedV1 = new LoansFixedV1({ account, ethers, config });
  const loanFixedV2 = new LoansFixedV2({ account, ethers, config });
  const loanFixed = new LoansFixed({ v1: loanFixedV1, v2: loanFixedV2 });
  const loans = new Loans({ api, account, fixed: loanFixed });
  const erc20 = new Erc20({ config, ethers, account });
  const nftfi = new NFTfi({ config, account, listings, offers, loans, erc20, utils });
  return nftfi;
};
