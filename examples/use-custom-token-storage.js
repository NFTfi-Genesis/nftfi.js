import NFTfi from '@nftfi/js';
import dotenv from 'dotenv';

dotenv.config();

async function run() {
  const customStore = {};

  // Init the NFTfi SDK
  const nftfi = await NFTfi.init({
    config: {
      api: { key: process.env.NFTFI_SDK_API_KEY },
      auth: {
        token: { key: 'tokenKey' }, // by default: "nftfiSdkToken"
        refreshToken: { key: 'refreshTokenKey' } // by default: "nftfiSdkRefreshToken"
      }
    },
    dependencies: {
      // overrides default storage location (default is local storage if accessible)
      storage: {
        set: (key, value) => {
          // set the tokens
          customStore[key] = value;
        },
        get: key => {
          // get the tokens
          return customStore[key];
        }
      }
    },
    ethereum: {
      account: {
        privateKey: process.env.NFTFI_SDK_ETHEREUM_LENDER_ACCOUNT_PRIVATE_KEY
      },
      provider: {
        url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL
      }
    }
  });

  // Use the SDK
  await nftfi.offers.get();
  console.log('[INFO] storage', customStore);
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
