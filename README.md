# NFTfi.js

A JavaScript SDK for interacting with the NFTfi Protocol.

NFTfi is a smart contract platform for P2P (Peer-2-Peer) loans using NFT as collateral. P2P loans
are directly between a Borrower and Lender — the Borrower uses an NFT as collateral to borrow ETH
or DAI, and the Lender provides liquidity. The NFT is then held in an escrow contract until the loan is
repaid. If the Borrower fails to repay in time, the Lender can claim the NFT.

Please note that this SDK is in **open beta**, and is constantly under development. **USE AT YOUR OWN RISK**.

## Install

```shell
yarn install
```

## Introduction

To begin experimenting on, please ensure that the following available:

- a NFTfi API key (contact the team)
- an Ethereum RPC Provider URL
- a Private Key of an Ethereum wallet (funded with some ETH, wETH, and DAI (optional))

You will need the values above when initialising the SDK. We recommend that you start by using the SDK on the Rinkeby network, to get a feeling for the various functionality. Then once you are ready, transitioning over to Mainnet.

Please note that if the SDK is configured to use Rinkeby, it will use the dApp located at [https://integration.nftfi.com](https://integration.nftfi.com). If a Mainnet configuration is used, the SDK will use the dApp located at [https://app.nftfi.com](https://app.nftfi.com).

## Getting Started

After you've set up and configured the environment, you need to initialise NFTfi.

```javascript
// Import SDK
import NFTfi from '@nftfi/js';

// Initialise
const nftfi = await NFTfi.init({
  config: { 
    api: { key: <nftfi-sdk-api-key> }
  },
  ethereum: {
    account: { privateKey: <ethereum-account-private-key> },
    provider: { url: <ethereum-provider-url> }
  }
});
```

Upon initialisation the NFTfi SDK is bound to the account that will be interacting with the NFTfi protocol. The account address is computed by using the private key specified.

We recommend that you **don't hardcode your credentials** into `NFTfi.init(...)`, instead you could use environment vars, or a more secure mechanism.

Once the SDK is initialised, you can use all the methods documented below.

## SDK Reference

<a name="Erc20"></a>

### Erc20
Class for working with ERC20 tokens.

**Kind**: global class  

* [Erc20](#Erc20)
    * [`.allowance(options)`](#Erc20+allowance) ⇒ <code>number</code>
    * [`.approve(options)`](#Erc20+approve) ⇒ <code>boolean</code>
    * [`.approveMax(options)`](#Erc20+approveMax) ⇒ <code>boolean</code>
    * [`.balanceOf(options)`](#Erc20+balanceOf) ⇒ <code>number</code>


* * *

<a name="Erc20+allowance"></a>

#### `erc20.allowance(options)` ⇒ <code>number</code>
Returns your account's ERC20 allowance for v1 & v2 NFTfi contracts.

**Kind**: instance method of [<code>Erc20</code>](#Erc20)  
**Returns**: <code>number</code> - The user account's token allowance for that contract, in base units (eg. 1000000000000000000 wei)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Hashmap of config options for this method |
| options.token.address | <code>string</code> | The ERC20 token address |
| options.nftfi.contract.name | <code>string</code> | The name of the contract NFTfi contract (eg. `v1.loan.fixed`, `v2.loan.fixed`) |

**Example**  
```js
const balance = await nftfi.erc20.allowance({
 token: { address: '0x00000000' },
 nftfi: { contract: { name: 'v2.loan.fixed' } }
});
```

* * *

<a name="Erc20+approve"></a>

#### `erc20.approve(options)` ⇒ <code>boolean</code>
Approves your account's ERC20 spending amount, if not already approved, for v1 & v2 NFTfi contracts.

**Kind**: instance method of [<code>Erc20</code>](#Erc20)  
**Returns**: <code>boolean</code> - Boolean value indicating whether the operation succeeded  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Hashmap of config options for this method |
| options.token.address | <code>string</code> | The ERC20 token address |
| options.nftfi.contract.name | <code>string</code> | The name of the contract NFTfi contract (eg. `v1.loan.fixed`, `v2.loan.fixed`) |
| options.amount | <code>number</code> | The token amount to approve, in base units (eg. 1000000000000000000 wei) |

**Example**  
```js
const results = await nftfi.erc20.approve({
  amount: 1000000000000000000,
  token: { address: '0x00000000' },
  nftfi: { contract: { name: 'v2.loan.fixed' } }
});
```

* * *

<a name="Erc20+approveMax"></a>

#### `erc20.approveMax(options)` ⇒ <code>boolean</code>
Approves your account's ERC20 maximum amount, if not already approved, for v1 & v2 NFTfi contracts.

**Kind**: instance method of [<code>Erc20</code>](#Erc20)  
**Returns**: <code>boolean</code> - Boolean value indicating whether the operation succeeded  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Hashmap of config options for this method |
| options.token.address | <code>string</code> | The ERC20 token address |
| options.nftfi.contract.name | <code>string</code> | The name of the contract NFTfi contract (eg. `v1.loan.fixed`, `v2.loan.fixed`) |

**Example**  
```js
const results = await nftfi.erc20.approveMax({
  token: { address: '0x00000000' },
  nftfi: { contract: { name: 'v2.loan.fixed' } }
});
```

* * *

<a name="Erc20+balanceOf"></a>

#### `erc20.balanceOf(options)` ⇒ <code>number</code>
Returns your account's balance of a given ERC20 token.

**Kind**: instance method of [<code>Erc20</code>](#Erc20)  
**Returns**: <code>number</code> - The user account's token balance, in base units (eg. 1000000000000000000 wei)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options |
| options.token.address | <code>string</code> | The ERC20 token address |

**Example**  
```js
const balance = await nftfi.erc20.balanceOf({
  token: { address: '0x00000000' }
});
```

* * *

<a name="Erc721"></a>

### Erc721
Class for working with ERC721 non-fungible tokens.

**Kind**: global class  

* [Erc721](#Erc721)
    * [`.ownerOf(options)`](#Erc721+ownerOf) ⇒ <code>string</code>
    * [`.setApprovalForAll(options)`](#Erc721+setApprovalForAll) ⇒ <code>boolean</code>


* * *

<a name="Erc721+ownerOf"></a>

#### `erc721.ownerOf(options)` ⇒ <code>string</code>
Returns the owner of the specified NFT.

**Kind**: instance method of [<code>Erc721</code>](#Erc721)  
**Returns**: <code>string</code> - The NFT's owner address  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options |
| options.token.address | <code>string</code> | The ERC721 token address |
| options.token.id | <code>string</code> | The ERC721 token ID |

**Example**  
```js
const address = await nftfi.erc721.ownerOf({
  token: {
   address: '0x00000000',
   id: '0'
  }
});
```

* * *

<a name="Erc721+setApprovalForAll"></a>

#### `erc721.setApprovalForAll(options)` ⇒ <code>boolean</code>
Sets or unsets the approval of a given NFTfi contract.
The NFTfi contract is allowed to transfer all tokens of the sender on their behalf.

**Kind**: instance method of [<code>Erc721</code>](#Erc721)  
**Returns**: <code>boolean</code> - Boolean value indicating whether the operation succeeded  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options |
| options.token.address | <code>string</code> | The ERC721 token address |
| options.nftfi.contract.name | <code>string</code> | The name of the NFTfi contract (eg. `v1.loan.fixed`, `v2.loan.fixed`) |

**Example**  
```js
const address = await nftfi.erc721.setApprovalForAll({
  token: {
   address: '0x00000000'
  },
  nftfi: { contract: { name: 'v2.loan.fixed' } }
});
```

* * *

<a name="Listings"></a>

### Listings
Class for working with listings.

**Kind**: global class  

* * *

<a name="Listings+get"></a>

#### `listings.get([options])` ⇒ <code>Array.&lt;object&gt;</code>
Gets all current listings.

**Kind**: instance method of [<code>Listings</code>](#Listings)  
**Returns**: <code>Array.&lt;object&gt;</code> - Array of listings hashmaps  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | Hashmap of config options for this method |
| [options.filters.nftAddresses] | <code>Array.&lt;string&gt;</code> | NFT contract addresses (optional) |
| [options.pagination.page] | <code>number</code> | Pagination page (optional) |
| [options.pagination.limit] | <code>number</code> | Pagination limit (optional) |

**Example**  
```js
// get listings without specifying pagination or filters
const listings = await nftfi.listings.get();
```
**Example**  
```js
// get the first `page` of listings, filtered by `nftAddresses`
const listings = await nftfi.listings.get({
  filters: {
    nftAddresses: ['0x11111111', '0x22222222']
  },
  pagination: {
    page: 1,
    limit: 20
  }
});
```

* * *

<a name="Loans"></a>

### Loans
Class for working with loans.

**Kind**: global class  

* [Loans](#Loans)
    * [`.get(options)`](#Loans+get) ⇒ <code>Array.&lt;object&gt;</code>
    * [`.begin(options)`](#Loans+begin) ⇒ <code>object</code>
    * [`.liquidate(options)`](#Loans+liquidate) ⇒ <code>object</code>
    * [`.repay(options)`](#Loans+repay) ⇒ <code>object</code>


* * *

<a name="Loans+get"></a>

#### `loans.get(options)` ⇒ <code>Array.&lt;object&gt;</code>
Gets loans in which your account is a participant.

**Kind**: instance method of [<code>Loans</code>](#Loans)  
**Returns**: <code>Array.&lt;object&gt;</code> - Array of listing objects  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Hashmap of config options for this method |
| options.filters.counterparty | <code>string</code> | Loans where the counterparty is: `lender` or `borrower` |
| options.filters.status | <code>string</code> | Loan status: `escrow`, `defaulted`, `repaid` or `liquidated` |

**Example**  
```js
// Get loans in `escrow` where your account is the `lender`
const loans = await nftfi.loans.get({
  filters: {
    counterparty: 'lender',
    status: 'escrow'
  }
});
```

* * *

<a name="Loans+begin"></a>

#### `loans.begin(options)` ⇒ <code>object</code>
Begin a loan. Called by the borrower when accepting a lender's offer.

**Kind**: instance method of [<code>Loans</code>](#Loans)  
**Returns**: <code>object</code> - Response object  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Hashmap of config options for this method |
| options.offer.nft.address | <code>string</code> | Address of the NFT being used as collateral |
| options.offer.nft.id | <code>string</code> | ID of NFT being used as collateral |
| options.offer.terms.loan.currency | <code>string</code> | Address of the ERC20 contract being used as principal/interest |
| options.offer.terms.loan.principal | <code>number</code> | Sum of money transferred from lender to borrower at the beginning of the loan |
| options.offer.terms.loan.repayment | <code>number</code> | Maximum amount of money that the borrower would be required to retrieve their collateral |
| options.offer.terms.loan.duration | <code>number</code> | Amount of time (measured in seconds) that may elapse before the lender can liquidate the loan |
| options.offer.terms.loan.expiry | <code>number</code> | Timestamp (in seconds) of when the signature expires |
| options.offer.lender.address | <code>string</code> | Address of the lender that signed the offer |
| options.offer.lender.nonce | <code>string</code> | Nonce used by the lender when they signed the offer |
| options.offer.signature | <code>string</code> | ECDSA signature of the lender |
| options.offer.nftfi.fee.bps | <code>number</code> | Percent (measured in basis points) of the interest earned that will be taken as a fee by the contract admins when the loan is repaid |
| options.offer.nftfi.contract.name | <code>string</code> | Name of contract used to facilitate the loan: `v1.loan.fixed`, `v2.loan.fixed` |

**Example**  
```js
// Begin a loan on a lender's offer.
const result = await nftfi.loans.begin({
  offer: {
    nft: {
      id: '42',
      address: '0x00000000',
    },
    lender: {
      address: '0x00000000',
      nonce: '314159265359'
    },
    terms: {
      loan: {
        principal: 1000000000000000000,
        repayment: 1100000000000000000,
        duration: 86400 * 7, // 7 days (in seconds)
        currency: "0x00000000"
        expiry: 1690548548 // Friday, 28 July 2023 14:49:08 GMT+02:00
      }
    },
    signature: '0x000000000000000000000000000000000000000000000000000',
    nftfi: {
      fee: { bps: 500 },
      contract: { name: 'v2.loan.fixed' }
    }
  }
});
```

* * *

<a name="Loans+liquidate"></a>

#### `loans.liquidate(options)` ⇒ <code>object</code>
Liquidate `defaulted` loans in which your account is a participant.
Can be called once a loan has finished its duration and the borrower still has not repaid.

**Kind**: instance method of [<code>Loans</code>](#Loans)  
**Returns**: <code>object</code> - Response object  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Hashmap of config options for this method |
| options.loan.id | <code>string</code> | The ID of the loan being liquidated |
| options.nftfi.contract.name | <code>string</code> | Name of contract used to facilitate the liquidation: `v1.loan.fixed`, `v2.loan.fixed` |

**Example**  
```js
// Liquidate a v1 fixed loan
const result = await nftfi.loans.liquidate({
  loan: { id: 1 },
  nftfi: {
    contract: {
      name: 'v1.loan.fixed'
    }
  }
});
```
**Example**  
```js
// Liquidate a v2 fixed loan
const result = await nftfi.loans.liquidate({
  loan: { id: 2 },
  nftfi: {
    contract: {
      name: 'v2.loan.fixed'
    }
  }
});
```

* * *

<a name="Loans+repay"></a>

#### `loans.repay(options)` ⇒ <code>object</code>
Repay a loan. Can be called at any time after the loan has begun and before loan expiry.

**Kind**: instance method of [<code>Loans</code>](#Loans)  
**Returns**: <code>object</code> - Response object  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Hashmap of config options for this method |
| options.loan.id | <code>string</code> | The ID of the loan being repaid |
| options.nftfi.contract.name | <code>string</code> | Name of contract used to facilitate the repayment: `v1.loan.fixed`, `v2.loan.fixed` |

**Example**  
```js
// Repay a v1 fixed loan
const result = await nftfi.loans.repay({
  loan: { id: 1 },
  nftfi: {
    contract: {
      name: 'v1.loan.fixed'
    }
  }
});
```
**Example**  
```js
// Repay a v2 fixed loan
const result = await nftfi.loans.repay({
  loan: { id: 2 },
  nftfi: {
    contract: {
      name: 'v2.loan.fixed'
    }
  }
});
```

* * *

<a name="Offers"></a>

### Offers
Class for working with offers.

**Kind**: global class  

* [Offers](#Offers)
    * [`.get([options])`](#Offers+get) ⇒ <code>Array.&lt;object&gt;</code>
    * [`.create(options)`](#Offers+create) ⇒ <code>object</code>
    * [`.delete(options)`](#Offers+delete) ⇒ <code>object</code>


* * *

<a name="Offers+get"></a>

#### `offers.get([options])` ⇒ <code>Array.&lt;object&gt;</code>
When called with no argument, gets all offers made by your account.
When provided with filters, gets all offers by specified filters.

**Kind**: instance method of [<code>Offers</code>](#Offers)  
**Returns**: <code>Array.&lt;object&gt;</code> - Array of offers  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | Hashmap of config options for this method |
| [options.filters.nft.address] | <code>string</code> | NFT contract address to filter by (optional) |
| [options.filters.nft.id] | <code>string</code> | NFT id of the asset to filter by (optional) |

**Example**  
```js
// Get all offers made by your account
const offers = await nftfi.offers.get();
```
**Example**  
```js
// Get all offers associated with a NFT
const offers = await nftfi.offers.get({
  filters: {
    nft: {
      address: "0x00000000",
      id: "42"
    }
  }
});
```

* * *

<a name="Offers+create"></a>

#### `offers.create(options)` ⇒ <code>object</code>
Creates a new offer on a NFT.

**Kind**: instance method of [<code>Offers</code>](#Offers)  
**Returns**: <code>object</code> - Response object  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Config options for this method |
| options.terms | <code>object</code> | Terms of the offer |
| options.nft | <code>object</code> | NFT to place an offer on |
| options.borrower | <code>object</code> | Owner of the NFT |
| options.nftfi | <code>object</code> | NFTfi options |

**Example**  
```js
// Create an offer on a NFT
const offer = await nftfi.offers.create({
  terms: {
    principal: 1000000000000000000,
    repayment: 1100000000000000000,
    duration: 86400 * 7, // 7 days (in seconds)
    currency: "0x00000000"
  },
  nft: {
    address: "0x00000000",
    id: "42"
  },
  borrower: {
    address: "0x00000000"
  },
  nftfi: {
    contract: {
      name: "v2.loan.fixed"
    }
  }
});
```

* * *

<a name="Offers+delete"></a>

#### `offers.delete(options)` ⇒ <code>object</code>
Deletes an active offer made by your account.

**Kind**: instance method of [<code>Offers</code>](#Offers)  
**Returns**: <code>object</code> - Response object  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Hashmap of config options for this method |
| options.offer.id | <code>object</code> | The Id of the offer to be deleted |

**Example**  
```js
// Get first avilable offer made by your account
const offers = await nftfi.offers.get();
const offerId = offers[0]['id'];
// Delete the offer by Id
const deleted = await nftfi.offers.delete({
  offer: {
    id: offerId
  }
});
```

* * *

<a name="Utils"></a>

### Utils
Class with utility methods.

**Kind**: global class  

* [Utils](#Utils)
    * [`.getNonce()`](#Utils+getNonce) ⇒ <code>string</code>
    * [`.getExpiry()`](#Utils+getExpiry) ⇒ <code>number</code>
    * [`.formatEther(wei)`](#Utils+formatEther) ⇒ <code>string</code>
    * [`.calcRepaymentAmount(principal, apr, duration)`](#Utils+calcRepaymentAmount) ⇒ <code>number</code>
    * [`.calcApr(principal, repayment, duration)`](#Utils+calcApr) ⇒ <code>number</code>


* * *

<a name="Utils+getNonce"></a>

#### `utils.getNonce()` ⇒ <code>string</code>
Gets random nonce.

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>string</code> - Nonce  
**Example**  
```js
// Get a random nonce
const nonce = nftfi.utils.getNonce();
```

* * *

<a name="Utils+getExpiry"></a>

#### `utils.getExpiry()` ⇒ <code>number</code>
Gets an expiry timestamp.

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>number</code> - Expiry  
**Example**  
```js
// Get an expiry timestamp far into the future
const expiry = nftfi.utils.getExpiry();
```

* * *

<a name="Utils+formatEther"></a>

#### `utils.formatEther(wei)` ⇒ <code>string</code>
Formats an amount of wei into a decimal string representing the amount of ether.

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>string</code> - Ether denomination of the amount  

| Param | Type | Description |
| --- | --- | --- |
| wei | <code>number</code> | Wei denomination of the amount |

**Example**  
```js
// Format wei into the amount of ether
const wei = 100;
const ether = nftfi.utils.formatEther(wei);
```

* * *

<a name="Utils+calcRepaymentAmount"></a>

#### `utils.calcRepaymentAmount(principal, apr, duration)` ⇒ <code>number</code>
Calculates the loan repayment amount given its other parameters.

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>number</code> - The result maximum repayment amount, in base units (eg. 1250000000000000000 wei)  

| Param | Type | Description |
| --- | --- | --- |
| principal | <code>number</code> | The loan's principal amount, in base units (eg. 1000000000000000000 wei) |
| apr | <code>number</code> | The APR (yearly percentage rate) |
| duration | <code>number</code> | The duration of the loan denominated in days |

**Example**  
```js
// Calculate the loan repayment amount
const principal = 1000000000000000000;
const apr = 32;
const duration = 30;
const amount = nftfi.utils.calcRepaymentAmount(principal, apr, duration);
```

* * *

<a name="Utils+calcApr"></a>

#### `utils.calcApr(principal, repayment, duration)` ⇒ <code>number</code>
Calculates the loan APR (yearly percentage rate) given its other parameters

**Kind**: instance method of [<code>Utils</code>](#Utils)  
**Returns**: <code>number</code> - The result APR  

| Param | Type | Description |
| --- | --- | --- |
| principal | <code>number</code> | The loan's principal amount in base units (eg. 1000000000000000000 wei) |
| repayment | <code>number</code> | The maximum repayment amount to be paid by the borrower, in base units (eg. 1230000000000000000 wei) |
| duration | <code>number</code> | The duration of the loan denominated in days |

**Example**  
```js
// Calculate the APR
const principal = 1000000000000000000;
const repayment = 1500000000000000000;
const duration = 30;
const apr = nftfi.utils.calcApr(principal, repayment, duration);
```

* * *


## Examples

To test examples of common NFTfi SDK use cases, run the following scripts from the root directory:

### Using an EOA (Externally Owned Account)

```shell
node examples/get-listings.js
node examples/make-offer-on-listing.js
node examples/make-offer-on-nft.js
node examples/get-my-offers.js
node examples/get-offers-on-listing.js
node examples/delete-my-offers.js
node examples/begin-loan.js
node examples/get-my-active-loans.js
node examples/repay-loan.js
node examples/liquidate-my-defaulted-loans.js
```

### Using a Multisig (Gnosis Safe)

```shell
node examples/multisig/gnosis-safe/make-offer-on-listing.js
node examples/multisig/gnosis-safe/make-offer-on-nft.js
node examples/multisig/gnosis-safe/get-offers.js
node examples/multisig/gnosis-safe/delete-offers.js
node examples/multisig/gnosis-safe/get-active-loans.js
node examples/multisig/gnosis-safe/liquidate-defaulted-loans.js
```
