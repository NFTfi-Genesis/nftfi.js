import Config from './nftfi/config.js';
import Account from './nftfi/account.js';
import Assertion from './nftfi/assertion.js';
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
import LoansFixedV2_3 from './nftfi/loans/fixed/v2_3/index.js';
import Bundles from './nftfi/bundles.js';
import BundlesHelper from './nftfi/bundles/helper.js';
import LoansFixedCollection from './nftfi/loans/fixed/collection/index.js';
import Immutables from './nftfi/immutables.js';
import LoansFixedCollectionV2 from './nftfi/loans/fixed/collection/v2/index.js';
import LoansFixedCollectionV2_3 from './nftfi/loans/fixed/collection/v2_3/index.js';
import Erc20 from './nftfi/erc20.js';
import Erc721 from './nftfi/erc721.js';
import Erc1155 from './nftfi/nft/erc1155.js';
import CryptoPunks from './nftfi/nft/cryptoPunks.js';
import Nft from './nftfi/nft.js';
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
import { Mutex } from 'async-mutex';
import RewardsOg from './nftfi/rewards/og/index.js';
import RewardsEarn from './nftfi/rewards/earn/index.js';
import RewardsOgAllocations from './nftfi/rewards/og/allocations/index.js';
import RewardsEarnAllocations from './nftfi/rewards/earn/allocations/index.js';
import RewardsEarnPoints from './nftfi/rewards/earn/points/index.js';
import Rewards from './nftfi/rewards.js';

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
    const hasWeb3Provider = options?.ethereum?.web3?.provider;
    const localStorage =
      typeof window !== 'undefined' && typeof window?.localStorage !== 'undefined' ? window.localStorage : null;

    if (!hasApiKey) {
      throw 'Please provide a value for the api.key field in the options parameter.';
    }
    if (hasGnosisSafePks && !hasGnosisSafeAddress) {
      throw 'Please provide a value for the ethereum.account.multisig.gnosis.safe.address field in the options parameter.';
    }
    if (
      (hasGnosisSafePks && (hasWeb3Provider || hasAccountPk)) ||
      (hasWeb3Provider && (hasGnosisSafePks || hasAccountPk)) ||
      (hasAccountPk && (hasGnosisSafePks || hasWeb3Provider))
    ) {
      throw 'Please supply values for either account.privateKey, account.web3.provider, or account.multisig.';
    }

    const ethers = options?.dependencies?.ethers || ethersjs;
    let provider = null;
    if (options?.ethereum?.provider?.url) {
      provider = new ethersjs.providers.getDefaultProvider(options?.ethereum?.provider?.url);
    }
    if (options?.ethereum?.web3?.provider) {
      provider = new ethersjs.providers.Web3Provider(options?.ethereum?.web3?.provider);
    }
    if (!provider && !options?.ethereum?.chain?.id) {
      throw 'Please provide a value for either ethereum.provider.url, ethereum.web3.provider or ethereum.chain.id.';
    }

    const network = (await provider?.getNetwork()) || { chainId: options?.ethereum?.chain?.id };
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
    let address;
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
      if (pk && !ethersjs.utils.isHexString(pk, 32)) {
        throw "Please provide a valid private key. It should start with '0x'.";
      }
      let providerAddresses = [];
      // Address is first address managed by provider if possible
      if (options?.ethereum?.web3?.provider) {
        providerAddresses = await provider.listAccounts();
        address = providerAddresses[0];
      }
      // Address is options.ethereum.account.address if it belongs to addresses managed by provider or provider doesn't manage any addresses
      if (
        options?.ethereum?.account?.address &&
        ((providerAddresses.length > 0 && providerAddresses.includes(options?.ethereum?.account?.address)) ||
          providerAddresses.length === 0)
      ) {
        address = options?.ethereum?.account?.address;
      }

      // Address is derived from private key if private key is provided
      if (pk) address = ethersjs.utils.computeAddress(pk);
      if (!pk && options?.ethereum?.web3?.provider && address) {
        signer = await provider.getSigner(address);
      }
      if (pk) {
        signer = new ethersjs.Wallet(pk, provider);
      }
      const eoa = new EOA({ address, signer, provider });
      account = new Account({ account: options?.dependencies?.account || eoa });
    }

    const mutex = new Mutex();
    const assertion = new Assertion({ account, provider });
    const websocket = new Websocket({ config, io });
    const http = new Http({ axios });
    const contractFactory =
      options?.dependencies?.contractFactory ||
      new ContractFactory({
        signer,
        ethers,
        account,
        Contract,
        provider,
        assertion
      });
    const utils =
      options?.dependencies?.utils || new Utils({ ethers, BN, Date, Math, Number, web3, contractFactory, config });
    const storage = options?.dependencies?.storage || new Storage({ storage: localStorage, config });
    const auth = new Auth({ http, account, config, utils, storage });
    const api = options?.dependencies?.api || new Api({ config, auth, http, assertion, mutex });
    const error = new Error();
    const result = new Result();
    const helper = new Helper({ config });
    const listings = new Listings({ api, config, helper, error });

    const loanFixedV1 = new LoansFixedV1({ config, contractFactory });
    const loanFixedV2 = new LoansFixedV2({ config, contractFactory });
    const loanFixedV2_1 = new LoansFixedV2_1({ config, contractFactory });
    const loanFixedV2_3 = new LoansFixedV2_3({ config, contractFactory });
    const loanFixedCollectionV2 = new LoansFixedCollectionV2({ config, contractFactory });
    const loanFixedCollectionV2_3 = new LoansFixedCollectionV2_3({ config, contractFactory });
    const loanFixedCollection = new LoansFixedCollection({ v2: loanFixedCollectionV2, v2_3: loanFixedCollectionV2_3 });
    const loanFixed = new LoansFixed({
      v1: loanFixedV1,
      v2: loanFixedV2,
      v2_1: loanFixedV2_1,
      v2_3: loanFixedV2_3,
      collection: loanFixedCollection
    });
    const loans = new Loans({ api, account, fixed: loanFixed, config, helper, error, assertion });
    const offersSignatures = new OffersSignatures({ account, ethers, config });
    const erc20 = new Erc20({ config, utils, account, contractFactory, BN, error, assertion });
    const offersHelper = new OffersHelper({ BN, Number, utils, offersSignatures, config, account, assertion });
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
      helper,
      assertion
    });
    const erc721 = new Erc721({ config, contractFactory, account, error, assertion });
    const erc1155 = new Erc1155({ config, contractFactory, account });
    const cryptoPunks = new CryptoPunks({ config, utils, error, result, contractFactory });
    const immutables = new Immutables({ config, account, error, result, contractFactory, assertion });
    const bundlesHelper = new BundlesHelper({ config, contractFactory, ethers });
    const bundles = new Bundles({ config, account, error, result, helper: bundlesHelper, contractFactory, assertion });
    const events = new Events({ websocket });
    const allocationsOg = new RewardsOgAllocations({ account, api, result, error, assertion });
    const rewardsOg = new RewardsOg({ allocations: allocationsOg });
    const allocationsEarn = new RewardsEarnAllocations({ account, api, result, error, assertion });
    const pointsEarn = new RewardsEarnPoints({ api, result, error });
    const rewardsEarn = new RewardsEarn({ allocations: allocationsEarn, points: pointsEarn });
    const rewards = new Rewards({ og: rewardsOg, earn: rewardsEarn });
    const nft = new Nft({
      config,
      result,
      nft: { erc1155, cryptoPunks, erc721 },
      ethers: ethersjs,
      account,
      contractFactory,
      utils,
      error,
      assertion
    });

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
      rewards,
      nft,
      utils
    });

    if (options?.logging?.verbose !== false) {
      console.log('NFTfi SDK initialised.');
    }

    return nftfi;
  }
};
