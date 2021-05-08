// SPDX-License-Identifier: GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity 0.5.16;

contract chat{
   

   address owner;

     mapping(string => chatmapping)  userchatlog;
     
     string [] private userchat;
     
     constructor () public {
    owner=msg.sender;
        
    }
   
    struct chatmapping{
       
        string username;
       
        
       
}
   
   function chatlog(string memory _userid) public payable returns(string memory){
       
        
        chatmapping storage user = userchatlog [_userid];
        user.username= _userid;
        userchat.push(_userid);
        
    
    
}

function getusers() public view returns(string [] memory){
    return userchat;
}
}