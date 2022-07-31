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
  // Define NFT to make offer on
  const nft = {
    address: process.env.NFTFI_SDK_EXAMPLE_NFT_ADDRESS,
    id: process.env.NFTFI_SDK_EXAMPLE_NFT_ID
  };
  // Get the owner of the NFT
  const ownerAddress = await nftfi.erc721.ownerOf({
    token: {
      address: nft.address,
      id: nft.id
    }
  });
  // Get the balance of the given account
  const currency = nftfi.config.erc20.weth.address;
  const symbol = nftfi.config.erc20.weth.symbol;
  const balance = await nftfi.erc20.balanceOf({
    token: { address: currency }
  });
  // Construct the loan terms
  const contractName = nftfi.config.loan.fixed.v2.name;
  const principal = balance / 2;
  const apr = 31.42;
  const days = 30;
  const repayment = nftfi.utils.calcRepaymentAmount(principal, apr, days);
  const duration = 86400 * days; // Number of days (loan duration) in seconds
  const terms = {
    principal,
    repayment,
    duration,
    currency
  };
  // Approve principal with NFTfi contracts
  await nftfi.erc20.approve({
    token: { address: currency },
    nftfi: { contract: { name: contractName } },
    amount: principal
  });
  console.log(`[INFO] balance of ${symbol} in account ${nftfi.account.getAddress()} is ${balance}`);
  console.log('[INFO] setting allowance on NFTfi contract.');
  // Create the offer on the NFT
  const result = await nftfi.offers.create({
    terms,
    nft,
    borrower: {
      address: ownerAddress
    },
    nftfi: {
      contract: {
        name: contractName
      }
    }
  });
  if (result.errors) {
    console.log(`[ERROR] could not create offer with the following: ${JSON.stringify(terms)}.`);
    console.log(`[ERROR] validation errors are: ${JSON.stringify(result.error)}.`);
  } else {
    console.log(`[INFO] made offer on ${nftfi.config.website.baseURI}/assets/${nft.address}/${nft.id}`);
    console.log(`[INFO] offer terms: ${JSON.stringify(terms)}.`);
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
