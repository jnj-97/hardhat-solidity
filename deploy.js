const ethers = require("ethers");
const fs = require("fs");

async function main() {
  const provider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/3YX6cYG01C0P17GPQsSZEFfJHH-ifUuL"
  );
  const wallet = new ethers.Wallet(
    "edc0df3fa32101365765c63c91bebc5a1371731e2c99ce5f766b9849cdb0fd81",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  const contract = await contractFactory.deploy();
  await contract.deploymentTransaction().wait(1); // Wait for deployment
  console.log("Contract Address: ", await contract.getAddress());

  let favoriteNumber = await contract.viewFavorite();
  console.log("Favorite number: ", favoriteNumber.toString());

  const tx = await contract.changeNumber(10); // This returns a transaction
  await tx.wait(1); // Wait for the changeNumber transaction to be mined

  favoriteNumber = await contract.viewFavorite();
  console.log("Favorite number: ", favoriteNumber.toString());
}

main();
