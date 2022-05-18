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
  const offers = await nftfi.offers.get();
  console.log(`[INFO] found ${offers.length} offer(s) for account ${nftfi.account.getAddress()}.`);
  if (offers.length > 0) {
    for (var i = 0; i < offers.length; i++) {
      const offer = offers[i];
      console.log(`[INFO] on ${nftfi.config.website.baseURI}/assets/${offer.nft.address}/${offer.nft.id}`);
    }
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
