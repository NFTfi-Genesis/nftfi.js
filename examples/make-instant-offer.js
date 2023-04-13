import NFTfi from '@nftfi/js';
import dotenv from 'dotenv';
dotenv.config();

async function initSdk(pk) {
  // Init the NFTfi SDK
  const sdk = await NFTfi.init({
    config: {
      api: {
        key: process.env.NFTFI_SDK_API_KEY
      }
    },
    ethereum: {
      account: { privateKey: pk },
      provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL }
    }
  });

  return sdk;
}

function randomAPR(min, max, float = 2) {
  const number = Math.random() * (max - min) + min;
  return Number(number.toFixed(float));
}

async function createOffer(sdk, context) {
  const { id, desiredTerms, borrower, nft } = context;
  const currency = desiredTerms.currency || sdk.config.erc20.weth.address;
  const apr = randomAPR(30, 50);
  const days = desiredTerms.duration ? Math.floor(desiredTerms.duration / 86400) : 30;
  const duration = desiredTerms.duration || 86400 * days; // Number of days (loan duration) in seconds
  const principal = desiredTerms.principal || (await sdk.erc20.balanceOf({ token: { address: currency } })) / 2;
  const repayment = Math.round(sdk.utils.calcRepaymentAmount(principal, apr, days)).toFixed(18);
  const terms = {
    principal,
    repayment,
    duration,
    currency
  };
  const payload = {
    terms,
    nft,
    borrower,
    nftfi: {
      contract: { name: desiredTerms.contract.name }
    },
    metadata: {
      forEvent: {
        id,
        type: 'OfferRequest'
      }
    }
  };
  const result = await sdk.offers.create(payload);
  if (result.errors) {
    console.log(`[ERROR] could not create offer with the following: ${JSON.stringify(terms)};`);
    console.log(`[ERROR] validation errors are: ${JSON.stringify(result.errors)}.`);
  }
  return result;
}

async function run() {
  // 1. Init the borrower and lender SDKs
  const [lenderSdk, borrowerSdk] = await Promise.all([
    initSdk(process.env.NFTFI_SDK_ETHEREUM_LENDER_ACCOUNT_PRIVATE_KEY),
    initSdk(process.env.NFTFI_SDK_ETHEREUM_BORROWER_ACCOUNT_PRIVATE_KEY)
  ]);

  // 2. Lender creates callback function to handle events
  let offer;
  const handleEvent = async event => {
    const { type, status, data } = event;
    // 5. Only handle offer requests that have been created
    if (type == 'OfferRequest' && status == 'created') {
      console.log(`[INFO] (lender) got a new offer request: ${JSON.stringify(event)}`);
      // 6. Create an offer in response to the OfferRequest
      offer = await createOffer(lenderSdk, data);
      console.log(`[INFO] (lender) made an offer ${JSON.stringify(offer)};`);
    }
  };

  // 3. Lender subscribes to events
  console.log('[INFO] (lender) subscribing to events');
  const options = {};
  const callbacks = { onEvent: handleEvent };
  lenderSdk.events.subscribe(options, callbacks);

  // 4. Borrower makes an offer request (all terms specified)
  console.log('[INFO] (borrower) making an offer request');
  await borrowerSdk.offers.requests.create({
    desiredTerms: {
      currency: borrowerSdk.config.erc20.weth.address,
      principal: '1000000000',
      repayment: '2000000000',
      duration: 86400 * 30,
      contract: {
        name: borrowerSdk.config.loan.fixed.v2_1.name
      }
    },
    nft: {
      id: process.env.NFTFI_SDK_EXAMPLE_NFT_ID,
      address: process.env.NFTFI_SDK_EXAMPLE_NFT_ADDRESS
    }
  });
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
