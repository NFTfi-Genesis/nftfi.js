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
  const loans = await nftfi.loans.get({
    filters: {
      counterparty: 'lender',
      status: 'escrow'
    }
  });
  console.log(`[INFO] found ${loans.length} active loan(s) for account ${nftfi.account.getAddress()}.`);
  if (loans.length > 0) {
    for (var i = 0; i < loans.length; i++) {
      const loan = loans[i];
      console.log(`[INFO] on ${nftfi.config.website.baseURI}/assets/${loan.nft.address}/${loan.nft.id}`);
    }
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
