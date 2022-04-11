const NFTfi = require('../');

async function run() {
  const nftfi = await NFTfi.init();
  const listings = await nftfi.listings.get({
    filters: {
      nftAddresses: []
    },
    pagination: {
      limit: 20,
      page: 1
    }
  });
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
    const days = listing?.terms?.loan?.duration == 90 ? 90 : 30; // Use 90 days if desired, else default to 30 days
    const repayment = nftfi.utils.calcRepaymentAmount(principal, apr, days);
    const duration = 86400 * days; // Number of days (loan duration) in seconds
    const terms = {
      principal,
      repayment,
      duration,
      currency
    };
    const contractName = listing.nftfi.contract.name;
    // Approve principal with NFTfi contracts
    await nftfi.erc20.approve({
      token: { address: currency },
      nftfi: { contract: { name: contractName } },
      amount: principal
    });
    console.log(`[INFO] balance of ${symbol} in account ${nftfi.account.address} is ${balance}`);
    console.log('[INFO] setting allowance on NFTfi contract.');
    // Create the offer on the listing
    const result = await nftfi.offers.create({
      terms,
      listing
    });
    if (result.errors) {
      console.log(`[ERROR] could not create offer with the following: ${JSON.stringify(terms)}.`);
      console.log(`[ERROR] validation errors are: ${JSON.stringify(result.errors)}.`);
    } else {
      console.log(
        `[INFO] made offer on ${nftfi.config.website.baseURI}/assets/${listing.nft.address}/${listing.nft.id}`
      );
      console.log(`[INFO] offer terms: ${JSON.stringify(terms)}.`);
    }
  } else {
    console.log(`[INFO] Found ${listings.length} listings. Can't make any offers at this time.`);
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
