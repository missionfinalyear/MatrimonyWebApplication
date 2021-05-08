import React,{ Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "./Register.css";
import Axios from "axios";
import { Redirect,Link,Switch,Route,Router } from "react-router-dom";
import Profile from "./userprofile.js";


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

class Login extends Component{
  


  constructor(props){
    super(props);

    this.state = {
      userName: null,
      passwordName: null,
      redirect:false,
      info:"",
      formErrors:{
            userName: "",
            passwordName: "",
      }
    };
  }
  


  formSubmit = event =>{
    event.preventDefault();
    if (formvalid(this.state)){
      console.log(`
            userName: ${this.state.userName},
            passwordName: ${this.state.passwordName},
        `)
      Axios.post("http://localhost:3001/get",{
        userName: this.state.userName,
        passwordName: this.state.passwordName,
      }).then((response) => {
        if (response.data.auth===true)
        {
        console.log(response.data);
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("id",response.data.userid)
        localStorage.setItem("ispremium",response.data.id[0].ispremium)
       // const r = window.confirm("We will take you to the dashboard, please wait!!");
        //if (r===true){
        this.setState({
          redirect: true,
          info: response.data.id
        })
        
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
    console.log(this.state.info);
    if(this.state.redirect){
     return <Redirect to={{pathname: "/dashboard"}} />
    }else{
      return(
      <div className="container h-100 d-flex justify-content-center" style={{paddingTop:"50px"}}>
      <div className="Login">
  
    <FormLabel className="label"> Sign In</FormLabel>
              

    <div >

      <form className="col-md-15 center" onSubmit={this.formSubmit} noValidate>

        <FormGroup controlId="username" bssize="large">
          <FormLabel>Username :</FormLabel>
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
          <FormLabel >Password :</FormLabel>
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
          Login
        </Button>
        <br>
        </br>
        <div>
        <Link to="/reset_password">
        <Button variant="Outlined">Reset Password</Button>
        </Link>
        </div>
        <div>
        <Link to="/signup">
        <Button variant="Outlined">Not Registered? Click Here.</Button>
        </Link>
        </div> 
        <div>
        <Link to="/adminlogin">
        <Button variant="Outlined">Admin Login</Button>
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


export default Login;

