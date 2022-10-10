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
import Erc721 from './nftfi/erc721.js';
import EOA from './nftfi/account/eoa.js';
import Multisig from './nftfi/account/multisig.js';
import MultisigGnosis from './nftfi/account/multisig/gnosis.js';
import MultisigGnosisOwner from './nftfi/account/multisig/gnosis/owner.js';
import ContractFactory from './nftfi/contract/factory.js';
import Contract from './nftfi/contract.js';
import NFTfi from './nftfi/index.js';

import { SafeEthersSigner, SafeService } from '@gnosis.pm/safe-ethers-adapters';
import Safe from '@gnosis.pm/safe-core-sdk';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
import BN from 'bn.js';
import { ethers as ethersjs } from 'ethers';
import web3 from 'web3';
import axios from 'axios';
import merge from 'lodash.merge';
import set from 'lodash.set';

export default {
  init: async function (options = {}) {
    // backwards compatibility: options.api.key to be assigned to options.config.api.key
    if (!options?.config?.api?.key) {
      set(options, 'config.api.key', options?.api?.key);
    }

    const hasApiKey = options?.config?.api?.key;
    const hasGnosisSafePks = options?.ethereum?.account?.multisig?.gnosis?.safe?.owners?.privateKeys;
    const hasGnosisSafeAddress = options?.ethereum?.account?.multisig?.gnosis?.safe?.address;
    const hasAccountPk = options?.ethereum?.account?.privateKey;
    const hasAccountAddress = options?.ethereum?.account?.address;
    const hasWeb3Provider = options?.ethereum?.web3?.provider;
    const hasProviderUrl = options?.ethereum?.provider?.url;

    if (!hasWeb3Provider && !hasProviderUrl) {
      throw 'Please provide a value for the ethereum.provider.url field in the options parameter.';
    }
    if (!hasWeb3Provider && !hasGnosisSafePks && !hasAccountPk) {
      throw 'Please provide a value for the ethereum.account.privateKey field in the options parameter.';
    }
    if (!hasApiKey) {
      throw 'Please provide a value for the api.key field in the options parameter.';
    }
    if (!hasGnosisSafeAddress && !hasAccountPk && !hasAccountAddress) {
      throw 'Please provide a value for the ethereum.account.address field in the options parameter.';
    }
    if (
      (hasGnosisSafePks && (hasWeb3Provider || hasAccountPk)) ||
      (hasWeb3Provider && (hasGnosisSafePks || hasAccountPk)) ||
      (hasAccountPk && (hasGnosisSafePks || hasWeb3Provider))
    ) {
      throw 'Please supply values for either account.privateKey, account.web3.provider, or account.multisig.';
    }

    const ethers = options?.dependencies?.ethers || ethersjs;
    const provider = options?.ethereum?.web3?.provider
      ? new ethersjs.providers.Web3Provider(options?.ethereum?.web3?.provider)
      : new ethersjs.providers.getDefaultProvider(options?.ethereum?.provider?.url);
    const network = await provider.getNetwork();
    const config = new Config({
      merge,
      chainId: network?.chainId,
      config: {
        ...options.config
      }
    });

    // Create an account, which is either an EOA or Multisig (Gnosis)
    let account;
    let signer;
    if (options.ethereum?.account?.multisig?.gnosis) {
      const gnosisOptions = options.ethereum?.account?.multisig?.gnosis;
      const privateKeys = gnosisOptions?.safe?.owners.privateKeys;
      const service = new SafeService(config.ethereum.account.multisig.gnosis.service.url);
      signer = new ethersjs.Wallet(privateKeys[0], provider);
      const ethAdapter = new EthersAdapter.default({ ethers: ethersjs, signer });
      const safeAddress = gnosisOptions?.safe?.address;
      const safe = await Safe.default.create({
        ethAdapter,
        safeAddress
      });
      const safeSigner = new SafeEthersSigner(safe, service, provider);
      const owners = privateKeys.map(function (privateKey) {
        return new MultisigGnosisOwner({
          multisig: { safe: { address: safeAddress } },
          config,
          ethers,
          privateKey,
          provider,
          EthersAdapter,
          Safe
        });
      });
      const gnosis = new MultisigGnosis({
        address: gnosisOptions?.safe?.address,
        owners,
        signer: safeSigner,
        provider,
        ethers
      });
      const multisig = new Multisig({
        multisig: gnosis
      });
      account = new Account({
        account: options?.dependencies?.account || multisig
      });
    } else {
      const pk = options?.ethereum?.account?.privateKey;
      const address = options?.ethereum?.account?.address || ethersjs.utils.computeAddress(pk);
      signer = !pk ? await provider.getSigner(address) : new ethersjs.Wallet(pk, provider);
      const eoa = new EOA({ address, signer, provider });
      account = new Account({ account: options?.dependencies?.account || eoa });
    }
    /////////////////////////////
    const http = new Http({ axios });
    const utils = options?.dependencies?.utils || new Utils({ ethers, BN, Date, Math, Number, web3 });
    const auth = new Auth({ http, account, config, utils });
    const api = options?.dependencies?.api || new Api({ config, auth, http });
    const listings = new Listings({ api, config });
    const contractFactory =
      options?.dependencies?.contractFactory || new ContractFactory({ signer, ethers, account, Contract });
    const loanFixedV1 = new LoansFixedV1({ config, contractFactory });
    const loanFixedV2 = new LoansFixedV2({ config, contractFactory });
    const loanFixed = new LoansFixed({ v1: loanFixedV1, v2: loanFixedV2 });
    const loans = new Loans({ api, account, fixed: loanFixed });
    const offersSignatures = new OffersSignatures({ account, ethers, config });
    const offersHelper = new OffersHelper({ BN, Number, utils, ethers, offersSignatures, config, account });
    const offers = new Offers({ api, account, offersHelper, loans });
    const erc20 = new Erc20({ config, account, contractFactory, BN });
    const erc721 = new Erc721({ config, contractFactory });
    const nftfi = new NFTfi({ config, account, listings, offers, loans, erc20, erc721, utils });

    if (options?.logging?.verbose === true) {
      console.log('NFTfi SDK initialised.');
    }

    return nftfi;
  }
};
