const NFTfi = require('../');

async function run() {
  const nftfi = await NFTfi.init();
  const loans = await nftfi.loans.get({
    filters: {
      counterparty: 'lender',
      status: 'escrow'
    }
  });
  console.log(`[INFO] found ${loans.length} active loan(s) for account ${nftfi.account.address}.`);
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
