import NFTfi from '@nftfi/js';
import dotenv from 'dotenv';

dotenv.config();

async function run() {
  // Init the NFTfi SDK
  const nftfi = await NFTfi.init({
    config: { api: { key: process.env.NFTFI_SDK_API_KEY } },
    ethereum: {
      account: { privateKey: process.env.NFTFI_SDK_ETHEREUM_LENDER_ACCOUNT_PRIVATE_KEY },
      provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL }
    }
  });
  // Get listings
  const listings = await nftfi.listings.get({
    filters: {
      nftAddresses: []
    },
    pagination: {
      limit: 20,
      page: 1
    }
  });
  console.log(`[INFO] found ${listings.length} listing(s).`);
  // Proceed if we find listings
  if (listings.length > 0) {
    for (var i = 0; i < listings.length; i++) {
      const listing = listings[i];
      console.log(`[INFO] listing #${i + 1}: ${JSON.stringify(listing)} \n`);
    }
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
