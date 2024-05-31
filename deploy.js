const ethers = require("ethers");
const fs = require("fs");

async function main() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  const wallet = new ethers.Wallet(
    "0x30f0d6f5bd0a91a5e3dbe4e30e24b3f592dd3b2a43b2751cf63ba7ee9837e507",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  const contract = await contractFactory.deploy();
  //await contract.deploymentTransaction().wait(1);
  let favoriteNumber = await contract.viewFavorite();
  console.log("Favorite number: ", favoriteNumber.toString());
  await contract.changeNumber(10);
  favoriteNumber = await contract.viewFavorite();
  console.log("Favorite number: ", favoriteNumber.toString());
}

main();
