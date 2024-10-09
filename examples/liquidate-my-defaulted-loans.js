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
  // Get defaulted loans
  const response = await nftfi.loans.get({
    filters: {
      lender: {
        address: nftfi.account.getAddress()
      },
      status: 'defaulted'
    }
  });
  const loans = response.data.results;

  console.log(`[INFO] found ${loans.length} defaulted loan(s) for account ${nftfi.account.getAddress()}.`);
  // Proceed if we find loans
  if (loans.length > 0) {
    for (var i = 0; i < loans.length; i++) {
      // Choose a loan
      const loan = loans[i];
      // Liquidate the loan
      const result = await nftfi.loans.liquidate({
        loan: { id: loan.id }
      });
      if (result.success === true) {
        console.log(
          `[INFO] liquidated ${loan.nftfi.contract.name} loan ${loan.id} on ${nftfi.config.website.baseURI}/assets/${loan.nft.address}/${loan.nft.id}`
        );
      } else {
        console.log(
          `[INFO] could not liquidate ${loan.nftfi.contract.name} loan ${loan.id} on ${nftfi.config.website.baseURI}/assets/${loan.nft.address}/${loan.nft.id}`
        );
      }
    }
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
