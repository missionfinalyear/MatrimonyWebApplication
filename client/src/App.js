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
import Checkout from "./containers/Checkout.js";
import Premium from "./containers/Premium.js";
import MyProfile from "./containers/MyProfile.js";
import ViewProfile from "./containers/ViewProfile.js";
import AdminDashboard from "./containers/AdminDashboard.js";
import AllUsersAdmin from "./containers/AllUsersAdmin.js";
import LetsChat from "./containers/LetsChat.js";
import MyLikedProfile from "./containers/MyLikedProfile.js";
import ViewLikedProfile from "./containers/ViewLikedProfile.js";
import AdminViewProfile from "./containers/AdminView.js";
import AllDocumentsAdmin from "./containers/AllDocumentsAdmin.js";
import PasswordReset from "./containers/PasswordReset.js";

const App=()=>{

  return(
    <body>
    <BrowserRouter> 
    <Switch>
    <div className="App">
    <Route exact path="/" component={Menu}/>
    <Route exact path="/dashboard" component={Dashboard}/>
    <Route exact path="/myprofile" component={MyProfile}/>
    <Route exact path="/signin" component={Login}/>
    <Route exact path="/adminlogin" component={Adminlogin}/>
    <Route exact path="/signup" component={Register}/>  
    <Route exact path="/profilefeed" component={Cardi}/>
    <Route exact path="/editprofile" component={Checkout}/>
    <Route exact path="/Upgrade-to-Premium" component={Premium}/>
    <Route exact path="/viewuser" component={ViewProfile}/>
    <Route exact path="/admindashboard" component={AdminDashboard}/>
    <Route exact path="/admin_view_all_users" component={AllUsersAdmin}/>
    <Route exact path="/mychats" component={LetsChat}/>
    <Route exact path="/my_interests" component={MyLikedProfile}/>
    <Route exact path="/viewlikeduser" component={ViewLikedProfile}/>
    <Route exact path="/adminviewuser" component={AdminViewProfile}/>
    <Route exact path="/all_documents_list" component={AllDocumentsAdmin}/>
    <Route exact path="/reset_password" component={PasswordReset}/>

    </div>
    </Switch>
    </BrowserRouter>    
    </body>
    );
};
export default App;