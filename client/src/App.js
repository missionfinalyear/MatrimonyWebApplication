import React from 'react';
//import Web3 from 'web3';
//import { profileAbi } from './abi/abis';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button} from "react-bootstrap";
import { Link,Switch,BrowserRouter,Route } from "react-router-dom";
import Menu from "./containers/menu.js";
import Profile from "./containers/userprofile.js";
import Dashboard from "./containers/home.js";
import Register from "./containers/Register.js";
import Login from "./containers/Login.js";
import Cardi from "./containers/Card.js";
import Error from "./containers/error.js";
import Adminlogin from "./containers/Adminlogin.js";

//const web3 = new Web3(Web3.givenProvider);
//const contractAddr='0x96A6F0BAeFA219Bc402fd5725fA2b22ce44e4410';
//const profile = new web3.eth.Contract(profileAbi, contractAddr);


const App=()=>{
  return(
    <body>
    <BrowserRouter> 
    <Switch>
    <div className="App">
    <Route exact path="/" component={Menu}/>
    <Route exact path="/dashboard" component={Dashboard}/>
    <Route exact path="/myprofile" component={Profile}/>
    <Route exact path="/signin" component={Login}/>
    <Route exact path="/adminlogin" component={Adminlogin}/>
    <Route exact path="/signup" component={Register}/>  
    <Route exact path="/profilefeed" component={Cardi}/>
    </div>
    </Switch>
    </BrowserRouter>    
    </body>
    );
};
export default App;