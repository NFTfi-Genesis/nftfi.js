import Config from './nftfi/config.js';
import Account from './nftfi/account.js';
import Http from './nftfi/http.js';
import Utils from './nftfi/utils.js';
import Websocket from './nftfi/websocket.js';
import Auth from './nftfi/auth.js';
import Api from './nftfi/api.js';
import Listings from './nftfi/listings.js';
import Offers from './nftfi/offers.js';
import OffersSignatures from './nftfi/offers/signatures.js';
import OffersHelper from './nftfi/offers/helper.js';
import OffersValidator from './nftfi/offers/validation.js';
import OffersRequests from './nftfi/offers/requests.js';
import Events from './nftfi/events.js';
import Loans from './nftfi/loans.js';
import LoansFixed from './nftfi/loans/fixed/index.js';
import LoansFixedV1 from './nftfi/loans/fixed/v1/index.js';
import LoansFixedV2 from './nftfi/loans/fixed/v2/index.js';
import LoansFixedV2_1 from './nftfi/loans/fixed/v2_1/index.js';
import Bundles from './nftfi/bundles.js';
import BundlesHelper from './nftfi/bundles/helper.js';
import LoansFixedCollection from './nftfi/loans/fixed/collection/index.js';
import Immutables from './nftfi/immutables.js';
import LoansFixedCollectionV2 from './nftfi/loans/fixed/collection/v2/index.js';
import Erc20 from './nftfi/erc20.js';
import Erc721 from './nftfi/erc721.js';
import EOA from './nftfi/account/eoa.js';
import Multisig from './nftfi/account/multisig.js';
import MultisigGnosis from './nftfi/account/multisig/gnosis.js';
import MultisigGnosisOwner from './nftfi/account/multisig/gnosis/owner.js';
import ContractFactory from './nftfi/contract/factory.js';
import Contract from './nftfi/contract.js';
import Helper from './nftfi/shared/helper.js';
import Result from './nftfi/result.js';
import Error from './nftfi/error.js';
import NFTfi from './nftfi/index.js';
import Storage from './nftfi/storage.js';

import { SafeEthersSigner, SafeService } from '@safe-global/safe-ethers-adapters';
import Safe from '@safe-global/safe-core-sdk';
import EthersAdapter from '@safe-global/safe-ethers-lib';
import BN from 'bn.js';
import { ethers as ethersjs } from 'ethers';
import web3 from 'web3';
import axios from 'axios';
import merge from 'lodash.merge';
import set from 'lodash.set';
import io from 'socket.io-client';
import DropsOg from './nftfi/drops/og/index.js';
import Drops from './nftfi/drops.js';
import DropsOgAllocations from './nftfi/drops/og/allocations/index.js';

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
    const localStorage =
      typeof window !== 'undefined' && typeof window?.localStorage !== 'undefined' ? window.localStorage : null;

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
      const ethAdapter = new EthersAdapter.default({ ethers: ethersjs, signerOrProvider: signer });
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

    const websocket = new Websocket({ config, io });
    const http = new Http({ axios });
    const utils = options?.dependencies?.utils || new Utils({ ethers, BN, Date, Math, Number, web3 });
    const storage = options?.dependencies?.storage || new Storage({ storage: localStorage, config });
    const auth = new Auth({ http, account, config, utils, storage });
    const api = options?.dependencies?.api || new Api({ config, auth, http });
    const error = new Error();
    const result = new Result();
    const helper = new Helper({ config });
    const listings = new Listings({ api, config, helper });
    const contractFactory =
      options?.dependencies?.contractFactory || new ContractFactory({ signer, ethers, account, Contract });

    const loanFixedV1 = new LoansFixedV1({ config, contractFactory });
    const loanFixedV2 = new LoansFixedV2({ config, contractFactory });
    const loanFixedV2_1 = new LoansFixedV2_1({ config, contractFactory });
    const loanFixedCollectionV2 = new LoansFixedCollectionV2({ config, contractFactory });
    const loanFixedCollection = new LoansFixedCollection({ v2: loanFixedCollectionV2 });
    const loanFixed = new LoansFixed({
      v1: loanFixedV1,
      v2: loanFixedV2,
      v2_1: loanFixedV2_1,
      collection: loanFixedCollection
    });
    const loans = new Loans({ api, account, fixed: loanFixed, config, helper });
    const offersSignatures = new OffersSignatures({ account, ethers, config });
    const erc20 = new Erc20({ config, account, contractFactory, BN });
    const offersHelper = new OffersHelper({ BN, Number, utils, offersSignatures, config, account });
    const offersValidator = new OffersValidator({ erc20, ethers, config, contractFactory });
    const offersRequests = new OffersRequests({ api, account, config, result, error });
    const offers = new Offers({
      api,
      account,
      offersHelper,
      offersValidator,
      offersRequests,
      loans,
      config,
      result,
      error,
      helper
    });
    const erc721 = new Erc721({ config, contractFactory, account });
    const immutables = new Immutables({ config, account, error, result, contractFactory });
    const bundlesHelper = new BundlesHelper({ config, contractFactory, ethers });
    const bundles = new Bundles({ config, account, error, result, helper: bundlesHelper, contractFactory });
    const events = new Events({ websocket });
    const allocationsOg = new DropsOgAllocations({ account, api, result, error });
    const dropOg = new DropsOg({ allocations: allocationsOg });
    const drops = new Drops({ og: dropOg });

    const nftfi = new NFTfi({
      config,
      account,
      listings,
      offers,
      loans,
      erc20,
      erc721,
      bundles,
      immutables,
      events,
      drops,
      utils
    });

    if (options?.logging?.verbose === true) {
      console.log('NFTfi SDK initialised.');
    }

    return nftfi;
  }
};
