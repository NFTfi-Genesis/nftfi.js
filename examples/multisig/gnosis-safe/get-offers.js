import NFTfi from '@nftfi/js';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  const nftfi = await NFTfi.init({
    config: { api: { key: process.env.NFTFI_SDK_API_KEY } },
    ethereum: {
      provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL },
      account: {
        multisig: {
          gnosis: {
            safe: {
              address: process.env.NFTFI_SDK_ETHEREUM_ACCOUNT_MULTISIG_GNOSIS_ADDRESS,
              owners: {
                privateKeys: process.env.NFTFI_SDK_ETHEREUM_ACCOUNT_MULTISIG_GNOSIS_OWNERS_PRIVATE_KEYS.split(',')
              }
            }
          }
        }
      }
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
