import NFTfi from '@nftfi/js';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  // Init the NFTfi SDK
  const borrower = await NFTfi.init({
    config: { api: { key: process.env.NFTFI_SDK_API_KEY } },
    ethereum: {
      account: { privateKey: process.env.NFTFI_SDK_ETHEREUM_BORROWER_ACCOUNT_PRIVATE_KEY },
      provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL }
    }
  });

  // Identify an active loan where you are the borrower.
  const {
    data: { results }
  } = await borrower.loans.get({
    filters: {
      borrower: { address: borrower.account.getAddress() },
      status: 'active',
      nftfi: { contract: { name: borrower.config.protocol.v3.assetOfferLoan.v1.name } }
    }
  });
  const loan = results[0];
  if (!loan) {
    console.log('[ERROR] No loans available for refinancing.');
    process.exit();
  }
  console.log('[INFO] Using the following loan:', JSON.stringify(loan));

  // Fetch offers that match the currency and NFT of the selected loan.
  // **The offer's currency must align with the loan's currency.**
  const offers = await borrower.offers.get({
    filters: {
      nft: { address: loan.nft.address },
      loan: { currency: { address: { eq: loan.terms.loan.currency } } },
      type: borrower.config.protocol.v3.type.collection.name //v3.collection
    }
  });

  // Use the first available offer
  const offer = offers[0];

  if (!offer) {
    console.log(`[ERROR] No offers available for refinancing loanId ${loan.id}.`);
    process.exit();
  }
  console.log('[INFO] Using the following offer:', JSON.stringify(offer));

  // Approve your obligation receipts with the Refinance contract.
  const ORApproval = await borrower.nft.approve({
    token: { address: borrower.config.protocol.v3.obligationReceipt.v1.address },
    nftfi: { contract: { name: borrower.config.protocol.v3.refinance.v1.name } }
  });
  console.log('[INFO] Obligation receipt approval:', ORApproval);

  // Approve ERC20 Tokens (if additional payment is needed).
  const erc20Approval = await borrower.erc20.approve({
    token: { address: loan.terms.loan.currency },
    nftfi: { contract: { name: borrower.config.protocol.v3.refinance.v1.name } },
    amount: loan.terms.loan.repayment
  });
  console.log('[INFO] Repayment amount approval:', erc20Approval);

  // Mint an obligation receipt for this loan.
  const ORMint = await borrower.loans.mintObligationReceipt({ loan });
  console.log('[INFO] Minting obligation receipt:', ORMint);

  // Add the NFT id to this collection offer
  offer.nft.id = loan.nft.id;

  // Initiate the refinancing with the selected loan and offer.
  const refiResult = await borrower.loans.refinance({ loan, offer });
  console.log('[INFO] Refinance result:', refiResult);
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
