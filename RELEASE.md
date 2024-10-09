### Highlights

- **Fixed and Flexible Offers**: A clear distinction between fixed and flexible offers has been introduced, providing more options for structuring loans.

### Important: Breaking Changes

- **End of v2 Offer Creation**:
  - It is no longer possible to create offers using the `v2-3.loan.fixed` or `v2-3.loan.fixed.collection` contracts.
  - Legacy SDK implementation (v0.5.5) will still support the creation of v2 offers (for backward compatibility).

- **Mix of v2 and v3 Offers in Order-Book**:
  - By default, the order-book will now return a mix of v2 and v3 offers. Users can filter based on the version if needed.
  - Legacy SDK implementation (v0.5.5) will only return v2 offers (for backward compatibility).

- **Temporary Redirect to Demo SDK API (Sepolia Config)**:
  - During this beta testing phase, all SDK requests using the Sepolia configuration will be redirected to `https://demo-sdk-api.nftfi.com`.
  - We shall keep the demo environment publicly accessible for the duration of the beta phase.

- **Transition Path and Deprecation Plan**:
  - Users relying on the original behavior of the SDK can continue using the legacy version.
  - We encourage migrating to the latest SDK version to take advantage of enhanced offer functionality.

### Details of Changes

- **Asset and Collection Offer Types**:
  - A `type` field has been introduced to distinguish whether an offer is for an `asset` or for the entire `collection`.
  - **Asset Offers**:
    ```js
    const offer = await lender.offers.create({
      type: 'v3.asset'
      // additional params
    });
    ```
  - **Collection Offers**:
    ```js
    const offer = await lender.offers.create({
      type: 'v3.collection'
      // additional params
    });
    ```

- **Fixed and Flexible Offers**:
  - Support for both **Fixed** and **Flexible** (prorated) loan types has been added:
    - **Fixed Loans**: Standard loans where the borrower is liable for the entire repayment amount.
    - **Flexible (Prorated) Loans**: Loans where interest is prorated based on the actual loan duration.
  - The **Origination Fee**, if greater than zero, is deducted from the principal, paid to the lender, and the remainder is transferred to the borrower upon loan start.

  ```js
  // Flexible collection offer with origination fee
  const collectionOffer = await lender.offers.create({
    type: 'v3.collection',
    terms: {
      interest: { prorated: true }, // Flexible
      origination: '50000000000000000', // Origination Fee
      principal: '1000000000000000000',
      repayment: '2000000000000000000'
      // additional params
    },
    // additional params
  });
  ```

  ```js
  // Fixed asset offer with no origination fee
  const assetOffer = await lender.offers.create({
    type: 'v3.asset',
    terms: {
      interest: { prorated: false }, // Fixed
      origination: '0', // No Origination Fee
      principal: '1000000000000000000',
      repayment: '2000000000000000000'
      // additional params
    },
    // additional params
  });
  ```

- **Offer Revoke Mechanism**:
  - The offer revocation process has been updated. For v3 offers, the `nftfi.contract.name` field is no longer required—only the offer `nonce` and `type` are needed. However, for v1 and v2 loans, the `contract.name` is still required.

  ```js
  // Revoking a v3 offer
  const nonce = offer.lender.nonce;
  const type = offer.type;
  const result = await lender.offers.revoke({
    offer: { nonce, type }
  });
  ```

  ```js
  // Revoking a v2 offer
  const nonce = offer.lender.nonce;
  const result = await lender.offers.revoke({
    offer: { nonce },
    nftfi: { contract: { name: offer.nftfi.contract.name } }
  });
  ```

- **Validation Support for v3 Offers**:
  - The upgraded validation mechanism ensures that all v3 offers adhere to the specified structure and rules.

  ```js
  // Validate a v3 offer
  const validation = await borrower.offers.validate({
    offer,
    checks: ['signature', 'terms.principal', 'lender.nonce']
  });
  ```

- **ERC721 and NFT Approvals**:
  - For v3 loans, borrowers and lenders must provide approvals for specific contracts:

  ```js
  // Borrower approves NFT with Escrow contract
  await borrower.nft.approve({
    token: { address: offer.nft.address },
    nftfi: { contract: { name: 'v3.escrow.v1' } }
  });
  ```

  ```js
  // Lender approves principal with the ERC20 Manager contract
  await lender.erc20.approve({
    token: { address: offer.terms.currency },
    amount: offer.principal,
    nftfi: { contract: { name: 'v3.erc20Manager.v1' } }
  });
  ```

  ```js
  // Borrower approves erc20 and obligation receipt with Refinancing contract
  await borrower.erc20.approve({
    token: { address: offer.terms.currency },
    amount: offer.repayment,
    nftfi: { contract: { name: 'v3.refinance.v1' } }
  });
  await borrower.nft.approve({
    token: { address: nftfi.config.protocol.v3.obligationReceipt.v1.address },
    nftfi: { contract: { name: 'v3.refinance.v1' } }
  });
  ```

- **New Offer Filters for Order-Book**:
  - New filters have been introduced for retrieving offers from the order-book:
    - `filters.type`: Filter offers by type (asset or collection).
    - `filters.type.in`: Filter offers by multiple types.

  ```js
  // Get v3.asset offers
  const offers = await borrower.offers.get({
    filters: { type: 'v3.asset' }
  });
  ```

  ```js
  // Get v3.collection offers
  const offers = await borrower.offers.get({
    filters: { type: 'v3.collection' }
  });
  ```

  ```js
  // Get both v3.collection and v3.asset offers
  const offers = await borrower.offers.get({
    filters: { type: { in: ['v3.asset', 'v3.collection'] } }
  });
  ```

- **Repayment Mechanism without `nftfi.contract.name` Requirement**:
  - The `contract.name` field is no longer required for v3 loan repayments. It is only necessary for v1 or v2 loans.

  ```js
  // Repay a v3 loan (no contract name required)
  const result = await borrower.loans.repay({
    loan: { id: 1 }
  });
  ```

  ```js
  // Repay a v2 loan
  const result = await borrower.loans.repay({
    loan: { id: 2 },
    nftfi: { contract: { name: 'v2-3.loan.fixed.collection' } }
  });
  ```

- **Liquidation Mechanism without `nftfi.contract.name` Requirement**:
  - Similar to the repayment mechanism, the liquidation process no longer requires the `contract.name` field for v3 loans.

  ```js
  // Liquidate a v3 loan (no contract name required)
  const result = await lender.loans.liquidate({
    loan: { id: 1 }
  });
  ```

  ```js
  // Liquidate a v2 loan
  const result = await lender.loans.liquidate({
    loan: { id: 2 },
    nftfi: { contract: { name: 'v2-3.loan.fixed' } }
  });
  ```

- **Refinancing Functionality**:
  - Refinancing is allowed from `v2` to `v3`, `v3` to `v3`, but **not** `v3` to `v2`.

- **New Minting Functionality for Obligation Receipts (OR) and Promissory Notes (PN)**:
  - Functionality has been added for minting Obligation Receipts (OR) and Promissory Notes (PN) during the loan lifecycle.

  ```js
  // Mint Obligation Receipt for a v3 loan
  const receipt = await borrower.loans.mintObligationReceipt({
    loan: { id: 1 }
  });
  ```

  ```js
  // Mint Promissory Note for a v3 loan
  const receipt = await lender.loans.mintPromissoryNote({
    loan: { id: 1 }
  });
  ```

- **New `calcEffectiveApr` Utility Function**:
  - A new utility function, `calcEffectiveApr`, has been added to calculate the effective APR (Annual Percentage Rate) for a loan.

  ```js
  const principal = '1000000000000000000';
  const repayment = '1200000000000000000';
  const originationFee = '100000000000000000';
  const duration = 365;
  const eAPR = nftfi.utils.calcEffectiveApr(principal, repayment, duration, originationFee);
  ```

---

## Examples

The following examples demonstrate how to utilize the new features of the SDK to create various types of loan offers, including **Asset Loans**, **Collection Loans**, and **Flexible Loans**. Additionally, the examples cover advanced functionalities like **Refinancing**. These code snippets provide a practical guide for lenders and borrowers to structure, approve, and execute loans with the latest SDK enhancements.

### Asset Loan

```js
// Construct the loan terms
const nft = { address: '0x000', id: '1' };
const type = "v3.asset";
const currency = lender.config.erc20.weth.address;
const principal = '1000000000000000000';
const repayment = '2000000000000000000';
const origination = '0'; // Origination fee
const interest = { prorated: false }; // Fixed
const secPerDay = 86400;
const duration = 1 * secPerDay;
const expiry = { seconds: 30 * secPerDay }; // 30 days (max limit)
const borrower = { address: '0x222' };

// Approve principal with NFTfi contracts
await lender.erc20.approve({
  token: { address: currency },
  nftfi: { contract: { name: "v3.erc20Manager.v1" } },
  amount: principal
});

// Create the offer on the listing
const offer = await lender.offers.create({
  type,
  nft,
  borrower,
  terms: {
    principal,
    repayment,
    duration,
    currency,
    expiry,
    origination,
    interest
  }
});
```

### Collection Loan

```js
// Construct the loan terms
const nft = { address: '0x000' };
const type = "v3.collection"; // Collection offer
const currency = lender.config.erc20.weth.address;
const principal = '1000000000000000000';
const repayment = '2000000000000000000';
const origination = '0'; // No origination fee
const interest = { prorated: false }; // Fixed
const secPerDay = 86400;
const duration = 1 * secPerDay;
const expiry = { seconds: 30 * secPerDay }; // 30 days (max limit)
const borrower = { address: '0x0000000000000000000000000000000000000000' }; // Zero address

// Approve principal with NFTfi contracts
await lender.erc20.approve({
  token: { address: currency },
  nftfi: { contract: { name: "v3.erc20Manager.v1" } },
  amount: principal
});

// Create the offer on the listing
const offer = await lender.offers.create({
  type,
  nft,
  borrower,
  terms: {
    principal,
    repayment,
    duration,
    currency,
    expiry,
    origination,
    interest
  }
});
```

### Flexible Loan

```js
// Construct the loan terms
const nft = { address: '0x000', id: '1' };
const type = "v3.asset";
const currency = lender.config.erc20.weth.address;
const principal = '1000000000000000000';
const repayment = '2000000000000000000';
const origination = '50000000000000000'; // Origination fee
const interest = { prorated: true }; // Flexible
const secPerDay = 86400;
const duration = 1 * secPerDay;
const expiry = { seconds: 30 * secPerDay }; // 30 days (max limit)
const borrower = { address: '0x222' };

// Approve principal with NFTfi contracts
await lender.erc20.approve({
  token: { address: currency },
  nftfi: { contract: { name: "v3.erc20Manager.v1" } },
  amount: principal
});

// Create the offer on the listing
const offer = await lender.offers.create({
  type,
  nft,
  borrower,
  terms: {
    principal,
    repayment,
    duration,
    currency,
    expiry,
    origination,
    interest
  }
});
```

### Refinance Loan

```js
// Fetch active loans
const loans = await borrower.loans.get({
  filters: { status: 'active' }
});
const loan = loans.data.results[0];

// Get a v3 offer
const offers = await borrower.offers.get({
  filters: {
    nft: { address: loan.nft.address },
    loan: { currency: { address: { eq: loan.terms.loan.currency } } },
    type: 'v3.collection'
  }
});
const offer = offers[0];

// Mint Obligation Receipt
await nftfi.loans.mintObligationReceipt({ loan });

// Allow the contract to manage your ORs
await borrower.nft.approve({
  token: { address: nftfi.config.protocol.v3.obligationReceipt.v1.address },
  nftfi: { contract: { name: 'v3.refinance.v1' } }
});

// If the refinancing proceed is negative, also allow the contract to manage your ERC20 to pay the proceed
await borrower.erc20.approveMax({
  token: { address: borrower.config.erc20.weth.address },
  nftfi: { contract: { name: 'v3.refinance.v1' } }
});

// Refinance
const result = await borrower.loans.refinance({
  loan,
  offer: {
    ...offer,
    nft: { ...offer.nft, id: NFT_ID }
  }
});
```
