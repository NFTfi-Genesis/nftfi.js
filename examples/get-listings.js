import NFTfi from '../src/nftfi.js';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  const nftfi = await NFTfi.init({
    api: { key: process.env.NFTFI_SDK_API_KEY },
    ethereum: {
      account: { privateKey: process.env.NFTFI_SDK_ETHEREUM_ACCOUNT_PRIVATE_KEY },
      provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL }
    }
  });
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
  if (listings.length > 0) {
    for (var i = 0; i < listings.length; i++) {
      const listing = listings[i];
      console.log(`[INFO] listing #${i + 1}: ${JSON.stringify(listing)}`);
    }
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
