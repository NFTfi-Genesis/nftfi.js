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

## Configure

NFTfi.js comes preconfigured to use the Rinkeby testnet, with the option to use Mainnet.

To begin experimenting on Rinkeby, please ensure that the following ENV vars are present:

- `API_KEY`: a NFTfi API key (contact the team)
- `RINKEBY_URL`: a Rinkeby RPC Provider url
- `RINKEBY_PRIVATE_KEY`: a private key of an Ethereum wallet (funded with Rinkeby-ETH, e.g. from [here](https://rinkebyfaucet.com/))

Example ENV vars:
```
API_KEY=<nftfi-rinkeby-api-key>
RINKEBY_URL=https://eth-rinkeby.alchemyapi.io/v2/<api-key>
RINKEBY_PRIVATE_KEY=<private-key>
```

Please note that these ENV vars can also be set in a `.env` file that is persisted to the root of this project directory. If there is a variable in your `.env` file which collides with one that already exists in your environment, then this variable will retrieved from your environment instead of the `.env` file.

### Mainnet

If Mainnet configuration is required, the relevant Mainnet ENV vars should be updated. Additionally, a `NETWORK` var should be set to `mainnet` (by default, if this var is not present, the default value is `rinkeby`)

Example ENV vars:
```
API_KEY=<nftfi-mainnet-api-key>
NETWORK=mainnet
MAINNET_URL=https://eth.alchemyapi.io/v2/<api-key>
MAINNET_PRIVATE_KEY=<private-key>
```

Please note that if the scripts are configured to use Rinkeby, they will use the [https://integration.nftfi.com](https://integration.nftfi.com) website. If a Mainnet configuration is used, the scripts will use the [https://www.nftfi.com](https://www.nftfi.com) website.

## Examples

To test examples of common NFTfi use cases, run the following scripts from the root directory:

```shell
node examples/get-listings.js
node examples/make-offer-on-collateral.js
node examples/get-my-offers.js
node examples/get-offers-on-collateral.js
node examples/delete-my-offers.js
node examples/get-my-active-loans.js
node examples/liquidate-my-defaulted-loans.js
```

## SDK Reference

After you've set up and configured the environment, you need to initialise NFTfi.

### NFTfi (Required)

Import and initialise NFTfi in your script.

```javascript
// Import root directory 'nftfi.js'
const NFTfi = require('../');
// Initialise NFTfi
const nftfi = await NFTfi.init();
```

Upon initialisation the NFTfi SDK is bound to the account address that will be interacting with the NFTfi protocol. The  address is computed by using the private key specified in `.env`

Once the SDK is initialised, you can use all the methods documented below.

<a name="Erc20"></a>

### Erc20
Class for working with ERC20 tokens.

**Kind**: global class  

* [Erc20](#Erc20)
    * [`.approve(options)`](#Erc20+approve) ⇒ <code>boolean</code>
    * [`.balanceOf(options)`](#Erc20+balanceOf) ⇒ <code>number</code>


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
    * [`.liquidate(options)`](#Loans+liquidate) ⇒ <code>object</code>


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

<a name="Loans+liquidate"></a>

#### `loans.liquidate(options)` ⇒ <code>object</code>
Liquidate `defaulted` loans in which your account is a participant.

**Kind**: instance method of [<code>Loans</code>](#Loans)  
**Returns**: <code>object</code> - Response object  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Hashmap of config options for this method |
| options.loan.id | <code>string</code> | The ID of the loan being liquidated |
| options.nftfi.contract.name | <code>string</code> | The contract used to facilitate the loan: `v1.loan.fixed`, `v2.loan.fixed` |

**Example**  
```js
// Liquidate a v1 fixed loan
const loans = await nftfi.loans.get({
  loan: {
    id: 1
  },
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
const loans = await nftfi.loans.get({
  loan: {
    id: 2
  },
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
Creates a new offer on a collateral listing.

**Kind**: instance method of [<code>Offers</code>](#Offers)  
**Returns**: <code>object</code> - Response object  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Config options for this method |
| options.terms | <code>object</code> | Terms of the offer |
| options.listing | <code>object</code> | Listing to place an offer on |

**Example**  
```js
// Construct the loan terms
const currency = nftfi.config.erc20.weth.address;
const principal = 1000000000000000000; // 1 wETH
const apr = 32;
const days = 30;
const repayment = nftfi.utils.calcRepaymentAmount(principal, apr, days);
const duration = 86400 * days; // Number of days in seconds
const terms = {
  principal,
  repayment,
  duration,
  currency
};
// Get first available listing (to make offer on)
const listings = await nftfi.listings.get();
const listing = listings[0];
// Approve principal wETH with the NFTfi contract
await nftfi.erc20.approve({
  token: { address: currency },
  amount: principal,
  nftfi: {
    contract: {
      name: listing.nftfi.contract.name
    }
  }
});
// Create an offer on the listing
const offer = await nftfi.offers.create({
  terms,
  listing: {
    nft: {
      id: listing.nft.id,
      address: listing.nft.address
    },
    borrower: {
      address: listing.borrower.address
    },
    nftfi: {
      contract: {
        name: listing.nftfi.contract.name
      }
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
// Get an expiry timestamp very far into the future
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

