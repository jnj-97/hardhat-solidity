//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage{
    uint32 public storeNumber=5;


    function viewFavorite() public view returns(uint32){
        return storeNumber;
    }
    function changeNumber(uint32 newNumber) public {
        storeNumber=newNumber;
    }

}