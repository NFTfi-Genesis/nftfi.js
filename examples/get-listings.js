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
  console.log(`[INFO] found ${listings.length} listing(s).`);
  if (listings.length > 0) {
    for (var i = 0; i < listings.length; i++) {
      const listing = listings[i];
      console.log(`[INFO] listing #${i + 1}: ${JSON.stringify(listing)}`);
    }
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
