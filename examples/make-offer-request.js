import NFTfi from '@nftfi/js';
import dotenv from 'dotenv';
dotenv.config();

const {
  NFTFI_SDK_API_KEY,
  NFTFI_SDK_ETHEREUM_PROVIDER_URL,
  NFTFI_SDK_EXAMPLE_NFT_ADDRESS,
  NFTFI_SDK_EXAMPLE_NFT_ID,
  NFTFI_SDK_ETHEREUM_BORROWER_ACCOUNT_PRIVATE_KEY
} = process.env;

async function run() {
  // Init the NFTfi SDK
  const nftfi = await NFTfi.init({
    config: {
      api: {
        key: NFTFI_SDK_API_KEY
      }
    },
    ethereum: {
      account: { privateKey: NFTFI_SDK_ETHEREUM_BORROWER_ACCOUNT_PRIVATE_KEY },
      provider: { url: NFTFI_SDK_ETHEREUM_PROVIDER_URL }
    }
  });

  // Make offer request, no terms specified
  const offerRequest1 = await nftfi.offers.requests.create({
    desiredTerms: {
      contract: {
        name: nftfi.config.loan.fixed.v2_3.name
      }
    },
    nft: {
      id: NFTFI_SDK_EXAMPLE_NFT_ID,
      address: NFTFI_SDK_EXAMPLE_NFT_ADDRESS
    }
  });
  console.log(`[INFO]: ${JSON.stringify(offerRequest1)}`);

  // Make offer request, all terms specified
  const offerRequest2 = await nftfi.offers.requests.create({
    desiredTerms: {
      currency: nftfi.config.erc20.weth.address,
      principal: '1000000000',
      repayment: '2000000000',
      duration: 86400 * 30,
      contract: {
        name: nftfi.config.loan.fixed.v2_3.name
      }
    },
    nft: {
      id: NFTFI_SDK_EXAMPLE_NFT_ID,
      address: NFTFI_SDK_EXAMPLE_NFT_ADDRESS
    }
  });
  console.log(`[INFO]: ${JSON.stringify(offerRequest2)}`);

  // Make offer request, currency, principal and duration specified
  const offerRequest3 = await nftfi.offers.requests.create({
    desiredTerms: {
      currency: nftfi.config.erc20.weth.address,
      principal: '1000000000',
      duration: 10000,
      contract: {
        name: nftfi.config.loan.fixed.v2_3.name
      }
    },
    nft: {
      id: NFTFI_SDK_EXAMPLE_NFT_ID,
      address: NFTFI_SDK_EXAMPLE_NFT_ADDRESS
    }
  });
  console.log(`[INFO]: ${JSON.stringify(offerRequest3)}`);
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
