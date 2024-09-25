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
  // Get listings
  const listings = await nftfi.listings.get({
    filters: {
      nftAddresses: [process.env.NFTFI_SDK_EXAMPLE_NFT_ADDRESS]
    },
    pagination: {
      limit: 20,
      page: 1
    }
  });
  // Proceed if we find listings
  if (listings.length > 0) {
    // Choose a specific listing to make an offer on
    const listing = listings[0];
    console.log(`[INFO] found listing: ${JSON.stringify(listing)}`);
    // Get the balance of the given account
    const currency = nftfi.config.erc20.weth.address;
    const symbol = nftfi.config.erc20.weth.symbol;
    const balance = await nftfi.erc20.balanceOf({
      token: { address: currency }
    });
    // Construct the loan terms
    const principal = balance / 2;
    const apr = 31.42;
    const days = 1;
    const repayment = nftfi.utils.calcRepaymentAmount(principal, apr, days);
    const duration = 86400 * days; // Number of days (loan duration) in seconds
    const expiry = 86400 * days;
    const origination = 0;
    const interest = { prorated: false };
    const terms = {
      principal,
      repayment,
      duration,
      currency,
      expiry,
      origination,
      interest
    };
    // Approve principal with NFTfi contracts
    await nftfi.erc20.approve({
      token: { address: currency },
      nftfi: { contract: { name: nftfi.config.protocol.v3.erc20Manager.v1.name } },
      amount: principal
    });
    console.log(`[INFO] balance of ${symbol} in account ${nftfi.account.getAddress()} is ${balance}`);
    console.log('[INFO] setting allowance on NFTfi contract.');
    // Create the offer on the listing
    const type = nftfi.config.protocol.v3.type.asset.name; //"v3.asset"
    const result = await nftfi.offers.create({
      type,
      terms,
      nft: listing.nft,
      borrower: {
        address: listing.borrower.address
      }
    });
    if (result.errors) {
      console.log(`[ERROR] could not create offer with the following: ${JSON.stringify(terms)}.`);
      console.log(`[ERROR] validation errors are: ${JSON.stringify(result.errors)}.`);
    } else {
      const currency = result.result.terms.loan.currency;
      const [ticker] = Object.keys(nftfi.config.erc20).filter(key => nftfi.config.erc20[key].address === currency);
      const unit = nftfi.config.erc20[ticker]?.unit;
      const duration = Math.floor(result.result.terms.loan.duration / 86400);
      const repayment = nftfi.utils.formatUnits(result.result.terms.loan.repayment, unit);
      const principal = nftfi.utils.formatUnits(result.result.terms.loan.principal, unit);
      const apr = nftfi.utils.calcApr(principal, repayment, duration).toFixed(2);
      console.log(
        `[INFO] made offer on ${nftfi.config.website.baseURI}/assets/${listing.nft.address}/${listing.nft.id}`
      );
      console.log(
        `[INFO] tokenId: ${result.result.nft.id} duration: ${duration} days; principal: ${principal} ${ticker}; repayment: ${repayment} ${ticker}; APR: ${apr}%`
      );
    }
  } else {
    console.log(`[INFO] Found ${listings.length} listings. Can't make any offers at this time.`);
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
