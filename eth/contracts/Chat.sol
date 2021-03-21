// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.5.16;

contract chat{
   //bool ischat= true;
   int ischat;
   
   function chatlog(int ischat) public view returns(string memory){
       
   if (ischat==1){
       return("chat stored");
   }
   else{
      return("chat dosent happend");
   }
}
}