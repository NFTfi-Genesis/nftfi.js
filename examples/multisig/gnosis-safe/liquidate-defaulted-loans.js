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
  const loans = await nftfi.loans.get({
    filters: {
      counterparty: 'lender',
      status: 'defaulted'
    }
  });
  console.log(`[INFO] found ${loans.length} defaulted loan(s) for account ${nftfi.account.getAddress()}.`);
  if (loans.length > 0) {
    for (var i = 0; i < loans.length; i++) {
      const loan = loans[i];
      const result = await nftfi.loans.liquidate({
        loan: { id: loan.id },
        nftfi: { contract: { name: loan.nftfi.contract.name } }
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
