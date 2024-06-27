const { assert, expect } = require("chai");
const { network, getNamedAccounts, ethers } = require("hardhat");

network.name != "sepolia"
  ? describe("BasicNFT", function () {
      let BasicNFTFactory,
        BasicNFT,
        deployer,
        user1,
        user2,
        user3,
        user4,
        user5,
        user6;

      beforeEach(async function () {
        BasicNFTFactory = await ethers.getContractFactory("BasicNFT");
        BasicNFT = await BasicNFTFactory.deploy();
        const accounts = await getNamedAccounts();
        [deployer, user1, user2, user3, user4, user5, user6] =
          await ethers.getSigners();
      });

      it("is deployed", async () => {
        assert(await BasicNFT.getAddress());
      });

      it("initially has a token id of 0", async () => {
        const currentTokenID = await BasicNFT.getTokenID();
        const expectedTokenID = "0";
        assert.equal(currentTokenID.toString(), expectedTokenID);
      });

      it("checks if the owner is able to withdraw funds", async () => {
        let initialBalance = await ethers.provider.getBalance(deployer.address);
        await BasicNFT.connect(user1).mintNFT({
          value: ethers.parseEther("0.02"),
        });
        await BasicNFT.withdrawBalance();
        let updatedBalance = await ethers.provider.getBalance(deployer.address);
        expect(updatedBalance).to.be.greaterThan(initialBalance);
      });

      describe("transactions", () => {
        it("mints an NFT", async () => {
          await expect(
            BasicNFT.connect(user1).mintNFT({
              value: ethers.parseEther("0.02"),
            })
          ).to.emit(BasicNFT, "Transfer");
          expect(await BasicNFT.balanceOf(user1.address)).to.equal(1);
          expect(await BasicNFT.tokenURI(0)).to.equal(
            "https://bafkreian5kkjegp4zffwucm3q745ljpdiwchaklqdkgylc2irrfg4v5j2m.ipfs.w3s.link"
          );
        });
      });

      describe("errors", () => {
        it("fails if payment isn't sent with the request", async function () {
          await expect(BasicNFT.mintNFT()).to.be.revertedWithCustomError(
            BasicNFT,
            "BasicNFT_belowMintFee"
          );
        });

        it("reverts if payment amount is less than the mint fee", async function () {
          await expect(
            BasicNFT.mintNFT({
              value: ethers.parseEther("0.001"),
            })
          ).to.be.revertedWithCustomError(BasicNFT, "BasicNFT_belowMintFee");
        });

        it("reverts if user tries to mint more than 2 NFTs", async function () {
          await BasicNFT.connect(user1).mintNFT({
            value: ethers.parseEther("0.02"),
          });
          await BasicNFT.connect(user1).mintNFT({
            value: ethers.parseEther("0.02"),
          });
          await expect(
            BasicNFT.connect(user1).mintNFT({
              value: ethers.parseEther("0.02"),
            })
          ).to.be.revertedWithCustomError(
            BasicNFT,
            "BasicNFT_maxTokenPerWallet"
          );
        });

        it("reverts with max tokens minted", async function () {
          await BasicNFT.connect(user1).mintNFT({
            value: ethers.parseEther("0.02"),
          });
          await BasicNFT.connect(user1).mintNFT({
            value: ethers.parseEther("0.02"),
          });
          await BasicNFT.connect(user2).mintNFT({
            value: ethers.parseEther("0.02"),
          });
          await BasicNFT.connect(user2).mintNFT({
            value: ethers.parseEther("0.02"),
          });
          await BasicNFT.connect(user3).mintNFT({
            value: ethers.parseEther("0.02"),
          });
          await BasicNFT.connect(user3).mintNFT({
            value: ethers.parseEther("0.02"),
          });
          await BasicNFT.connect(user4).mintNFT({
            value: ethers.parseEther("0.02"),
          });
          await BasicNFT.connect(user4).mintNFT({
            value: ethers.parseEther("0.02"),
          });
          await BasicNFT.connect(user5).mintNFT({
            value: ethers.parseEther("0.02"),
          });
          await BasicNFT.connect(user5).mintNFT({
            value: ethers.parseEther("0.02"),
          });
          await expect(
            BasicNFT.connect(user6).mintNFT({
              value: ethers.parseEther("0.02"),
            })
          ).to.be.revertedWithCustomError(BasicNFT, "BasicNFT_maxTokensMinted");

          const currentTokenID = await BasicNFT.getTokenID();
          const expectedTokenID = "10";
          assert.equal(currentTokenID.toString(), expectedTokenID);
        });
      });
    })
  : describe.skip;
