import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Nav.css";
import { Nav, Navbar, Form ,Button,FormControl} from "react-bootstrap";
import {BrowserRouter, Switch} from "react-router-dom";
//import Login from "./containers/Register.js";

//import Register from "./containers/Register.js";
import Login from "./containers/Login.js";

const App1=()=>{
	return(
		<>
		<Switch>
		<BrowserRouter>
		 <body>
		 		
   <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">Matrimony Website</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#dashboard">Dashboard</Nav.Link>
      <Nav.Link href="#about">About Us</Nav.Link>
    </Nav>
    <Form inline>
     <Nav className="mr-auto">
      <Nav.Link href="#signin">SignIn</Nav.Link>
      <Nav.Link href="#signup">SignUp</Nav.Link>
      </Nav>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
  </Navbar>

 		 <br />
  
 	 <button type="submit"  path="/Login">
  	<Login />
   	</button>
  
   </body>
  </BrowserRouter>
  </Switch>
		</>
		)
}
export default App1;