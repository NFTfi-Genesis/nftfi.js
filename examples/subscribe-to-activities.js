import NFTfi from '@nftfi/js';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  // Init the NFTfi SDK
  const nftfi = await NFTfi.init({
    config: {
      api: {
        key: process.env.NFTFI_SDK_API_KEY
      }
    },
    ethereum: {
      account: { privateKey: process.env.NFTFI_SDK_ETHEREUM_LENDER_ACCOUNT_PRIVATE_KEY },
      provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL }
    }
  });
  // Define callback functions
  const handleMessage = function (message) {
    console.log(`[INFO] ${message}`);
  };
  const handleEvent = function (event) {
    console.log(`[EVENT] ${JSON.stringify(event)}`);
  };
  const handleError = function (error) {
    console.log(`[ERROR] ${error}`);
  };
  // Subscribe to events
  nftfi.events.subscribe(
    {},
    {
      onMessage: handleMessage,
      onEvent: handleEvent,
      onError: handleError
    }
  );
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
