pragma solidity 0.5.16;

contract Payment{
    
    address owner;
    constructor () public {
    owner=msg.sender;
        
    }
    uint public price;
    mapping (address => uint) balance;

    function AcceptEth() public {
        // set owner as the address of the one who created the contract
       // owner = msg.sender;
        // set the price to 0.01 ether
        price = 0.01 ether;
    }

    function accept() payable public returns(uint){
        // Error out if anything other than 0.01 ether is sent
        require(msg.value == price);

        // Track that calling account deposited ether
        balance[owner] += msg.value;
        return balance[owner];
    }
}