import NFTfi from '@nftfi/js';
import dotenv from 'dotenv';
import * as util from 'util';
dotenv.config();

async function run() {
  // Init the NFTfi SDK
  const nftfi = await NFTfi.init({
    config: {
      api: { key: process.env.NFTFI_SDK_API_KEY }
    },
    ethereum: {
      account: { privateKey: process.env.NFTFI_SDK_ETHEREUM_LENDER_ACCOUNT_PRIVATE_KEY },
      provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL }
    }
  });

  const response = await nftfi.loans.get({
    filters: {
      lender: {
        address: nftfi.account.getAddress()
      },
      status: 'active'
    }
  });
  const [loan] = response.data.results;

  if (loan) {
    console.log(`[INFO] found loan id = "${loan.id}", contract name = "${loan.nftfi.contract.name}"`);

    const result = await nftfi.rewards.earn.points.get({
      loan: {
        id: loan.id
      },
      nftfi: {
        contract: {
          name: loan.nftfi.contract.name
        }
      }
    });

    if (result.error) {
      console.log('[ERROR] failed to request rewards earn points: ', result.error);
      return;
    }

    console.log('[INFO] found rewards earn points: ', util.inspect(result.data, false, null, true));
  } else {
    console.log('[INFO] no loan found to request rewards earn points');
    return;
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
