pragma solidity 0.5.16;

contract profile{
  
  struct User{

    string name;
    string dob;
    string email;
    string gender;
    uint mobile;
    string username;
    string password;
    
    bool set;

  }
    
    address owner;

  mapping(address => User)  users;
  

    address[] private totalusers;

  constructor () public {
    owner=msg.sender;
        
    }

    function addUser(address _address, string memory _name, string memory _dob, string memory _email, string memory _gender, uint  _mobile,string memory _username, string memory _password) public payable {
        
        User storage user = users [_address];
        require(!user.set);
        user.name=_name;
        user.dob=_dob;
        user.email=_email;
        user.gender=_gender;
        user.mobile=_mobile;
        user.username=_username;
        user.password=_password;
        totalusers.push(_address);
        user.set = true;
    }

    function getUser(address _address) public view returns(string memory, string memory, string memory, string memory, uint , string memory, string memory){
        return(users[_address].name,
               users[_address].dob,
               users[_address].email,
               users[_address].gender,
               users[_address].mobile,
               users[_address].username,
               users[_address].password);

    }
    

    
    function getTotalUsers()public view returns( address  [] memory){
    return totalusers;
}
    

}