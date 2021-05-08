pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract likedprofile{
     
     //int isliked;
     
     address owner;

     mapping(address => usermapping)  usermap;
     
     string [] private totalusersliked;
     
     constructor () public {
    owner=msg.sender;
        
    }
   
    struct usermapping{
       
        string username;
        uint likescount;
        
       
}
   
function likedlog(address _address,int _isliked,string memory _username) public payable{
     
    if(_isliked == 1){
        
        usermapping storage user = usermap [_address];
        user.likescount+=1;
        user.username= _username;
        totalusersliked.push(_username);
        
    }
    
   
}

function seelikedcount(address _address) public view returns(uint256){
         return(usermap[_address].likescount);
    
}

function seelikedlog(address _address) public view returns(string [] memory){
         return totalusersliked;
    
}
}