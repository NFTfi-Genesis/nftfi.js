import NFTfi from '@nftfi/js';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  // Init the NFTfi SDK
  const borrower = await NFTfi.init({
    config: {
      api: { key: process.env.NFTFI_SDK_API_KEY }
    },
    ethereum: {
      account: { privateKey: process.env.NFTFI_SDK_ETHEREUM_BORROWER_ACCOUNT_PRIVATE_KEY },
      provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL }
    }
  });
  // Get active loans where you are the borrower counterparty
  const loans = await borrower.loans.get({
    filters: {
      counterparty: 'borrower',
      status: 'escrow'
    }
  });
  console.log(`[INFO] found ${loans.length} active loan(s) for account ${borrower.account.getAddress()}.`);
  // Proceed if we find 1 or more loans
  if (loans.length > 0) {
    // Get the first loan
    const loan = loans[0];
    // Approve repayment amount with NFTfi contracts
    await borrower.erc20.approveMax({
      token: { address: loan.terms.loan.currency },
      nftfi: { contract: { name: loan.nftfi.contract.name } }
    });
    // Repay the loan
    const result = await borrower.loans.repay({
      loan: { id: loan.id },
      nftfi: { contract: { name: loan.nftfi.contract.name } }
    });
    if (result.success === true) {
      console.log('[INFO] loan has been repaid');
    } else {
      console.log('[INFO] loan could not be repaid');
    }
  } else {
    console.log(`[INFO] found ${loans.length} loans. can't repay any loans at this time.`);
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
