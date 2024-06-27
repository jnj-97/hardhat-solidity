const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("BasicNFT");
  const simpleStorage = await simpleStorageFactory.deploy();
  console.log("Contract Address: ", await simpleStorage.getAddress());
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.waitForDeployment();
    await verify(await simpleStorage.getAddress(), []);
  }
}

async function verify(contractAddress, args) {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
}

module.exports = { verify };

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
