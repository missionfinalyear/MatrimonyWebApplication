import React from "react";
import {Route,Switch,Link,BrowserRouter} from "react-router-dom";
import Register from "../containers/Register.js";
import Login from "../containers/Login.js";
import { Button} from "react-bootstrap";
import '../App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
const emoji = require("emoji-dictionary");

const Menu = () => {
	return (
    <body>
 	<div className="Menu">
    <h1> Catch The Match <span role="img" aria-label="heart" >💘</span></h1>  
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '25vh'}}>
    <Link to="/signin">      
    <Button style={{ borderRadius: "12px", fontSize:"40px" }}>Sign In</Button>
    </Link>
    </div>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '25vh'}}>
    <Link to="/signup">
    <Button variant="Outlined" style={{ borderRadius: "12px", fontSize:"20px", fontWeight:"bold"}}>Do not Have an Account?
    <br>
    </br>
     Click Here!</Button>
    </Link>
    </div> 
    </div>
    </body>
);
};

export default Menu;
