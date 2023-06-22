import NFTfi from '@nftfi/js';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  let borrower, lender, bundle, immutable, listing;
  try {
    // Init the NFTfi SDKs ///////////////////////////////////////////
    borrower = await NFTfi.init({
      config: {
        api: { key: process.env.NFTFI_SDK_API_KEY }
      },
      ethereum: {
        account: { privateKey: process.env.NFTFI_SDK_ETHEREUM_BORROWER_ACCOUNT_PRIVATE_KEY },
        provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL }
      }
    });
    lender = await NFTfi.init({
      config: {
        api: { key: process.env.NFTFI_SDK_API_KEY }
      },
      ethereum: {
        account: { privateKey: process.env.NFTFI_SDK_ETHEREUM_LENDER_ACCOUNT_PRIVATE_KEY },
        provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL }
      }
    });

    // Make a bundle /////////////////////////////////////////////////

    // Define NFT to move into bundle
    const nfts = {
      address: process.env.NFTFI_SDK_EXAMPLE_NFT_ADDRESS,
      ids: [process.env.NFTFI_SDK_EXAMPLE_NFT_ID, process.env.NFTFI_SDK_EXAMPLE_NFT_ID_2]
    };
    console.log('[INFO] NFTs going into the bundle:', nfts);

    // Mint bundle
    bundle = await borrower.bundles.mint();

    // Set approval for NFT to get transfered into the bundle
    await borrower.erc721.setApprovalForAll({
      token: { address: nfts.address },
      nftfi: { contract: { name: 'v1-1.bundler' } }
    });

    // Add elements to bundle
    bundle = await borrower.bundles.add({
      bundle: { id: bundle.data.bundle.id },
      elements: [{ token: { address: nfts.address, ids: nfts.ids } }],
      nftfi: { contract: { name: 'v1-1.bundler' } }
    });

    // Seal the bundle
    immutable = await borrower.bundles.seal({
      bundle: { id: bundle.data.bundle.id },
      nftfi: { contract: { name: 'v1-1.bundler' } }
    });

    // Create a listing //////////////////////////////////////////////

    // This is a mock listing, under normal circumstances you would get predefined listings from the API
    listing = {
      terms: {
        duration: 90,
        principal: 1000000000000000000,
        repayment: 1100000000000000000,
        currency: borrower.config.erc20.weth.address
      },
      borrower: {
        address: borrower.account.getAddress()
      },
      nft: {
        address: borrower.config.immutable.v1_1.address,
        id: immutable.data.immutable.id
      },
      nftfi: {
        contract: {
          name: borrower.config.loan.fixed.v2_1.name
        }
      }
    };
    console.log('[INFO] The bundle listing:', listing);

    // Create offer on the listing ///////////////////////////////////

    // Check if listing is for an immutable bundle
    const isBundle = listing.nft.address.toLowerCase() === lender.config.immutable.v1_1.address.toLowerCase();
    if (isBundle) {
      // Get the elements inside of the immutable bundle
      bundle = await lender.immutables.getBundle({
        immutable: { id: listing.nft.id },
        nftfi: { contract: { name: 'v1-1.immutable.bundle' } }
      });
      bundle = await lender.bundles.elements({
        bundle: { id: bundle.data.bundle.id },
        nftfi: { contract: { name: 'v1-1.bundler' } }
      });
      const nfts = [];
      for (const element of bundle.data.elements) {
        for (const id of element.token.ids) {
          nfts.push({ address: element.token.address, id: id });
        }
      }
      console.log('[INFO] NFTs inside bundle listing:', nfts);
    }
  } catch (e) {
    console.error(e);
  } finally {
    // Clean up the example //////////////////////////////////////////
    console.log('[INFO] Cleaning up...');

    // Unseal the immutable
    bundle = await borrower.immutables.unseal({
      immutable: { id: immutable.data.immutable.id },
      nftfi: { contract: { name: 'v1-1.immutable.bundle' } }
    });

    // Empty the bundle
    await borrower.bundles.empty({
      bundle: { id: bundle.data.bundle.id },
      nftfi: { contract: { name: 'v1-1.bundler' } }
    });
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
