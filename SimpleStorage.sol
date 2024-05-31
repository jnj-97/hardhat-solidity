pragma solidity ^0.8.8;

contract SimpleStorage{
    uint32 public storeNumber=5;

    function changeNumber(uint32 newNumber) public {
        storeNumber=newNumber;
    }

}