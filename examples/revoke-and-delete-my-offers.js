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
  // Get offers
  const offers = await nftfi.offers.get();
  console.log(`[INFO] found ${offers.length} offer(s) for account ${nftfi.account.getAddress()}.`);
  // Proceed if we find offers
  if (offers.length > 0) {
    for (var i = 0; i < offers.length; i++) {
      // Choose an offer
      const offer = offers[i];
      // Revoke the offer
      const id = offers[0]['id'];
      const nonce = offers[0]['lender']['nonce'];
      const contractName = offers[0]['nftfi']['contract']['name'];
      const revoked = await nftfi.offers.revoke({
        offer: { nonce },
        nftfi: { contract: { name: contractName } }
      });
      if (revoked?.success === false) {
        console.log(`[ERROR] could not revoke offer: ${JSON.stringify(offer)}.`);
      } else {
        console.log(
          `[INFO] revoked offer on ${nftfi.config.website.baseURI}/assets/${offer.nft.address}/${offer.nft.id}`
        );
      }
      const deleted = await nftfi.offers.delete({
        offer: { id }
      });
      if (deleted?.success === false) {
        console.log(`[ERROR] could not delete offer: ${JSON.stringify(offer)}.`);
      } else {
        console.log(
          `[INFO] deleted offer on ${nftfi.config.website.baseURI}/assets/${offer.nft.address}/${offer.nft.id}`
        );
      }
    }
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
