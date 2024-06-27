// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract BasicNFT is ERC721, ERC721URIStorage,Ownable {
    uint16 private _tokenID=0;
    string private constant _tokenURI="https://bafkreian5kkjegp4zffwucm3q745ljpdiwchaklqdkgylc2irrfg4v5j2m.ipfs.w3s.link";
     mapping (address => uint16) private nftCount;

    error BasicNFT_maxTokensMinted(uint16);
    error BasicNFT_maxTokenPerWallet();
    error BasicNFT_belowMintFee();

    constructor()
        ERC721("Nobin's Token", "NJJ")
         Ownable(msg.sender)
    {}

    function safeMint(address to, uint256 tokenId) private
    {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }

    function mintNFT() payable public  returns (uint16 _tokenNumber){
        if(_tokenID==10){
            revert BasicNFT_maxTokensMinted(_tokenID);
        }
        if(nftCount[msg.sender]==2){
            revert BasicNFT_maxTokenPerWallet();
        }
        if(msg.value<0.01 ether){
            revert BasicNFT_belowMintFee();
        }
        else{
            safeMint(msg.sender,_tokenID);
            _tokenID+=1;
            nftCount[msg.sender]+=1;
            return _tokenID;
        }
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    function getTokenID() public view returns (uint16){
        return _tokenID;
    }
    function getNFTperWallet(address wallet) public view returns (uint16){
        return nftCount[wallet];
    }

     function withdrawBalance() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "Contract balance is zero");
        
        payable(owner()).transfer(contractBalance);
    }
}
