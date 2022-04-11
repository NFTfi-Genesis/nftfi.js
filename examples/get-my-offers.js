const NFTfi = require('../');

async function run() {
  const nftfi = await NFTfi.init();
  const offers = await nftfi.offers.get();
  console.log(`[INFO] found ${offers.length} offer(s) for account ${nftfi.account.address}.`);
  if (offers.length > 0) {
    for (var i = 0; i < offers.length; i++) {
      const offer = offers[i];
      console.log(`[INFO] on ${nftfi.config.website.baseURI}/assets/${offer.nft.address}/${offer.nft.id}`);
    }
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
