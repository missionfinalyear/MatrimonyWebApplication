pragma solidity 0.5.16;

contract PasswordReset{
    
    address owner;
    constructor () public {
    owner=msg.sender;
        
    }
    uint public price;
    mapping (address => uint) count;

    function changePassword() payable public returns(uint){
       

        // Track that calling account for chainging the password. 
        count[owner] += 1;
        return count[owner];
    }
}