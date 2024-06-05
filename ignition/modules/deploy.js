const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await simpleStorageFactory.deploy();
  console.log("Contract Address: ", await simpleStorage.getAddress());
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.waitForDeployment();
    verify(await simpleStorage.getAddress(), []);
  }
  let favoriteNumber = await simpleStorage.viewFavorite();
  console.log("Favorite number: ", favoriteNumber);
  const newNumber = await simpleStorage.changeNumber(10);
  await newNumber.wait(2);
  favoriteNumber = await simpleStorage.viewFavorite();
  console.log("Favorite number: ", favoriteNumber);
}

async function verify(contractAddress, args) {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerString().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
