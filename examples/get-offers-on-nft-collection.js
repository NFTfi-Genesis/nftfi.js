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
  // Get offers on the NFT collection
  const offers = await nftfi.offers.get({
    filters: {
      nft: {
        address: process.env.NFTFI_SDK_EXAMPLE_NFT_ADDRESS
      }
    }
  });
  // Proceed if we find offers
  if (offers.length > 0) {
    console.log(`[INFO] offers for NFT collection ${process.env.NFTFI_SDK_EXAMPLE_NFT_ADDRESS}`);
    for (var i = 0; i < offers.length; i++) {
      const offer = offers[i];
      const duration = Math.floor(offer.terms.loan.duration / 86400);
      const repayment = nftfi.utils.formatEther(offer.terms.loan.repayment);
      const principal = nftfi.utils.formatEther(offer.terms.loan.principal);
      const apr = nftfi.utils.calcApr(principal, repayment, duration).toFixed(2);
      console.log(
        `[INFO] tokenId: ${offer.nft.id} duration: ${duration} days; principal: ${principal}; repayment: ${repayment}; APR: ${apr}%`
      );
    }
  } else {
    console.log(`[INFO] can find any offers for nft.address ${process.env.NFTFI_SDK_EXAMPLE_NFT_ADDRESS}`);
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
