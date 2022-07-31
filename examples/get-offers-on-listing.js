import NFTfi from '@nftfi/js';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  // Init the NFTfi SDK
  const nftfi = await NFTfi.init({
    config: { api: { key: process.env.NFTFI_SDK_API_KEY } },
    ethereum: {
      account: { privateKey: process.env.NFTFI_SDK_ETHEREUM_BORROWER_ACCOUNT_PRIVATE_KEY },
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
      skip: 0
    }
  });
  // Proceed if we find listings
  if (listings.length > 0) {
    // Choose a listing
    const listing = listings[0];
    // Get offers on the listing
    const offers = await nftfi.offers.get({
      filters: {
        nft: {
          id: listing.nft.id,
          address: listing.nft.address
        }
      }
    });
    console.log(
      `[INFO] found ${offers.length} offer(s) for listing ${nftfi.config.website.baseURI}/assets/${listing.nft.address}/${listing.nft.id}.`
    );
    // Proceed if we find offers
    if (offers.length > 0) {
      for (var i = 0; i < offers.length; i++) {
        const offer = offers[i];
        const duration = Math.floor(offer.terms.loan.duration / 86400);
        const repayment = nftfi.utils.formatEther(offer.terms.loan.repayment);
        const principal = nftfi.utils.formatEther(offer.terms.loan.principal);
        const apr = nftfi.utils.calcApr(principal, repayment, duration).toFixed(2);
        console.log(
          `[INFO] duration: ${duration} days; principal: ${principal}; repayment: ${repayment}; erc20: ${offer.terms.loan.currency}; APR: ${apr}%`
        );
      }
    }
  } else {
    console.log(`[INFO] found ${listings.length} listings. Can't get any corresponding offers at this time.`);
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
