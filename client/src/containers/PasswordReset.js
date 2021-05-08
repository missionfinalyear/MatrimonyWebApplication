import React,{ Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "./Register.css";
import Axios from "axios";
import { Redirect,Link,Switch,Route,Router } from "react-router-dom";
import Web3 from 'web3';
import {PasswordResetAbi} from '../abi/PasswordResetAbi.js';

const web3 = new Web3(Web3.givenProvider);
const contractAddr='0x966585aD9f7b889de64DE360e130f119eF1Cba42';
const password = new web3.eth.Contract(PasswordResetAbi, contractAddr);


const formvalid = ({formErrors, ...rest}) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  Object.values(rest).forEach(val =>{
    val === null && (valid = false);
  });
  return valid;
}


Axios.defaults.withCredentials = true;

class PasswordReset extends Component{
  


  constructor(props){
    super(props);

    this.state = {
      userName: null,
      passwordName: null,
      redirect:false,
      formErrors:{
            userName: "",
            passwordName: "",
      }
    };
  }
  


  formSubmit = async (event) =>{
    event.preventDefault();
    if (formvalid(this.state)){
      console.log(`
            userName: ${this.state.userName},
            passwordName: ${this.state.passwordName},
        `)
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    await password.methods.changePassword().send({
      from: accounts[0]
    });
      Axios.post("http://localhost:3001/resetpass",{
        userName: this.state.userName,
        passwordName: this.state.passwordName,
      }).then((response) => {
        if (response.data.auth===true)
        {
        this.setState({
          redirect: true,
        })

        alert(JSON.stringify(response.data.status))
        }
        else{
          alert(JSON.stringify(response.data.status))
        }
      });
    }
    else{
      console.error("Form Invalid - Display Error Message");
    }
  };


  InputEvent = e => {
    e.preventDefault();
    const { name,value } = e.target;
    let formErrors = {...this.state.formErrors};
    switch(name)
    {
      case 'userName':
        formErrors.userName = value.length <6 && value.length >0 ? "Mininum 6 characters required.": "";
        break;
      case 'passwordName':
        formErrors.passwordName = value.length <8 && value.length >0 ? "Mininum 8 characters required.": "";
        break;
      default:
        break;
    }
     this.setState({ formErrors, [name]: value}, ()=> console.log(this.state));
  };

  render(){
    const { formErrors } = this.state;
    console.log(this.state.redirect);
    if(this.state.redirect){
     return <Redirect to={{pathname: "/signin"}} />
    }else{
      return(
      <div className="container h-100 d-flex justify-content-center" style={{paddingTop:"50px"}}>
      <div className="Login">
  
    <FormLabel className="label"> Reset Password</FormLabel>
              

    <div >

      <form className="col-md-15 center" onSubmit={this.formSubmit} noValidate>

        <FormGroup controlId="username" bssize="large">
          <FormLabel>Enter Your Username :</FormLabel>
          <FormControl
            type="text"
            name="userName"
            placeholder="Enter Username"
            noValidate
            onChange={this.InputEvent}
          />
          {formErrors.userName.length > 0 && (
                <span className="errorcolor">{formErrors.userName}</span>
              )}
        </FormGroup>

        <FormGroup controlId="password" bssize="large">
          <FormLabel >Enter New Password :</FormLabel>
          <FormControl
            placeholder="Enter Password"
            name="passwordName"
            onChange={this.InputEvent}
            type="password"
            noValidate
          />
          {formErrors.passwordName.length > 0 && (
                <span className="errorcolor">{formErrors.passwordName}</span>
              )}
        </FormGroup>
        <Button block type="submit">
          Change Password
        </Button>
        <br>
        </br>
        <div>
        <Link to="/signup">
        <Button variant="Outlined">Not Registered? Click Here.</Button>
        </Link>
        </div> 
      </form>
   </div>
    </div>
    </div>
      )
    }
  }
}


export default PasswordReset;

