import NFTfi from '@nftfi/js';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  // Init the NFTfi SDK
  const nftfi = await NFTfi.init({
    config: {
      api: { key: process.env.NFTFI_SDK_API_KEY }
    },
    ethereum: {
      account: { privateKey: process.env.NFTFI_SDK_ETHEREUM_BORROWER_ACCOUNT_PRIVATE_KEY },
      provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL }
    }
  });

  // Define NFT to move into bundle
  const nft = {
    address: process.env.NFTFI_SDK_EXAMPLE_NFT_ADDRESS,
    ids: [process.env.NFTFI_SDK_EXAMPLE_NFT_ID, process.env.NFTFI_SDK_EXAMPLE_NFT_ID_2]
  };

  // Create bundle
  let bundle = await nftfi.bundles.mint();
  console.log('[INFO] bundle created', JSON.stringify(bundle));

  // Set approval for NFT to get transfered into the bundle
  await nftfi.erc721.setApprovalForAll({
    token: { address: nft.address },
    nftfi: { contract: { name: 'v1-1.bundler' } }
  });

  // Add elements to bundle
  bundle = await nftfi.bundles.add({
    bundle: { id: bundle.data.bundle.id },
    elements: [{ token: { address: nft.address, ids: nft.ids } }],
    nftfi: { contract: { name: 'v1-1.bundler' } }
  });
  console.log('[INFO] bundle after add', JSON.stringify(bundle));

  // Elements of bundle
  bundle = await nftfi.bundles.elements({
    bundle: { id: bundle.data.bundle.id },
    nftfi: { contract: { name: 'v1-1.bundler' } }
  });
  console.log('[INFO] bundle elements', JSON.stringify(bundle));

  // Remove bundle elements
  bundle = await nftfi.bundles.remove({
    bundle: { id: bundle.data.bundle.id },
    elements: [{ token: { address: nft.address, ids: [nft.ids[0]] } }],
    nftfi: { contract: { name: 'v1-1.bundler' } }
  });
  console.log('[INFO] bundle after remove', JSON.stringify(bundle));

  // Wrap the bundle (produces an immutable bundle)
  const immutable = await nftfi.bundles.seal({
    bundle: { id: bundle.data.bundle.id },
    nftfi: { contract: { name: 'v1-1.bundler' } }
  });
  console.log('[INFO] sealed bundle (immutable bundle)', immutable);

  // Withdraw the bundle from the immutable
  const immutableId = immutable.data.immutable.id;
  bundle = await nftfi.immutables.unseal({
    immutable: { id: immutableId },
    nftfi: { contract: { name: 'v1-1.immutable.bundle' } }
  });
  console.log('[INFO] unsealed bundle', bundle);

  // Empty the bundle
  bundle = await nftfi.bundles.empty({
    bundle: { id: bundle.data.bundle.id },
    nftfi: { contract: { name: 'v1-1.bundler' } }
  });
  console.log('[INFO] empty bundle', bundle);
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
