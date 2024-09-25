import NFTfi from '@nftfi/js';
import dotenv from 'dotenv';

dotenv.config();

async function run() {
  // Init the NFTfi SDK
  const borrower = await NFTfi.init({
    config: { api: { key: process.env.NFTFI_SDK_API_KEY } },
    ethereum: {
      account: { privateKey: process.env.NFTFI_SDK_ETHEREUM_BORROWER_ACCOUNT_PRIVATE_KEY },
      provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL }
    }
  });

  // Get offers
  const offers = await borrower.offers.get({
    filters: {
      nft: {
        address: process.env.NFTFI_SDK_EXAMPLE_NFT_ADDRESS
      },
      type: borrower.config.protocol.v3.type.collection.name //v3.collection
    }
  });

  // Proceed if we find offers
  if (offers.length > 0) {
    // Choose an offer
    const offer = offers[0];
    console.log(offer);
    // Set approval for NFT going into escrow
    console.log('[INFO] approving NFT for use with NFTfi escrow contract');
    await borrower.nft.approve({
      token: { address: offer.nft.address },
      nftfi: { contract: { name: borrower.config.protocol.v3.escrow.v1.name } }
    });
    // Begin loan for given offer
    console.log('[INFO] using offer to begin loan');
    const result = await borrower.loans.begin({
      offer: { ...offer, nft: { ...offer.nft, id: process.env.NFTFI_SDK_EXAMPLE_NFT_ID } }
    });
    if (result.success === true) {
      console.log('[INFO] loan has begun');
    } else {
      console.log('[ERROR] loan could not begin');
    }
  } else {
    console.log(`[INFO] found ${offers.length} offers. can't start a loan at this time.`);
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
