import React,{ Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "./Register.css";
import Web3 from 'web3';
import { profileAbi } from '../abi/abis';
import Axios from "axios";

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
//const mobRegex = RegExp(/^([+]\d{2}[ ])?\d{10}$/);

const web3 = new Web3(Web3.givenProvider);
const contractAddr='0x96A6F0BAeFA219Bc402fd5725fA2b22ce44e4410';
const profile = new web3.eth.Contract(profileAbi, contractAddr);



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

class Register extends Component{

  constructor(props){
    super(props);

    this.state = {
      fullName: null,
      emailName: null,
      mobName: null,
      dateName: null,
      userName: null,
      passwordName: null,
      gender: null,
      formErrors:{
            fullName: "",
            emailName: "",
            mobName: "",
            dateName: "",
            userName: "",
            passwordName: "",
            gender:"",
      }
    };
    this.handleRadioChange = this.handleRadioChange.bind(this); 
  }
  handleRadioChange(event){
    this.setState({
      gender : event.target.value
    })
  }

onCreateUser = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    //this.setState({ showLoader1: 'block' });
    await profile.methods.addUser(account,web3.utils.fromAscii(this.state.fullName),this.state.dateName ,web3.utils.fromAscii(this.state.emailName),this.state.gender,this.state.mobName,this.state.userName,this.state.passwordName).send({
      from: accounts[0]
    });
    //this.setState({ showLoader1: 'none' });
    const data = { 
            fullName: this.state.fullName,
            emailName: this.state.emailName,
            mobName: this.state.mobName,
            dateName: this.state.dateName,
            userName: this.state.userName,
            passwordName: this.state.passwordName,
            gender: this.state.gender,
                    };
    Axios.post("http://localhost:3001/insert",data)
        .then(() => alert("successful insert"));
      console.log(`
            
            userName: ${this.state.userName},
            passwordName: ${this.state.passwordName},
           
        `)
  };

  formSubmit = event =>{
    event.preventDefault();
    if (formvalid(this.state)){
      console.log(`
            fullName: ${this.state.fullName},
            emailName: ${this.state.emailName},
            mobName: ${this.state.mobName},
            dateName: ${this.state.dateName},
            userName: ${this.state.userName},
            passwordName: ${this.state.passwordName},
            gender: ${this.state.gender},
        `)
      
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
      case 'fullName':
        formErrors.fullName = value.length <4 && value.length >0 ? "Please enter your full name.": "";
        break;
      case 'emailName':
        formErrors.emailName = emailRegex.test(value) && value.length >0 ? "": "Invalid email address.";
        break;
      case 'mobName':
        if (value === "") {formErrors.mobName="Please enter your phone number."}
        else if (value !== "") {
          
              var pattern = new RegExp(/^[0-9\b]+$/);
              if (!pattern.test(value)) {
               
                    formErrors.mobName= "Please enter only number.";
                  }else if(value.length !== 10){
                
                    formErrors.mobName= "Please enter valid phone number.";
                }
                else{formErrors.mobName="";}
            }       
        break;
      case 'dateName':
                if (value === "") {formErrors.dateName="Please enter your date of birth."}
        break;
      case 'userName':
        formErrors.userName = value.length <6 && value.length >0 ? "Mininum 6 characters required.": "";
        break;
      case 'passwordName':
        formErrors.passwordName = value.length <8 && value.length >0 ? "Mininum 8 characters required.": "";
        break;
      case 'gender':
        formErrors.gender = value==="" ? "please select gender.": "";
        break;
      default:
        break;
    }
     this.setState({ formErrors, [name]: value}, ()=> console.log(this.state));
  };

  render(){
    const { formErrors } = this.state;

    return(
      <div className="container h-100 d-flex justify-content-center">
              <div className="Login">
    <FormLabel className="label"> Sign Up</FormLabel>
              

    <div >

      <form className="col-md-15 center" onSubmit={this.formSubmit} noValidate>

        <FormGroup controlId="name" bssize="large">
        <FormLabel >Name :</FormLabel>
          <FormControl
            className= {formErrors.fullName.length > 0 ? "error" : null}
            autoFocus
            type="text"   
            name="fullName"
            placeholder="Enter your full name"
            noValidate
            value={this.state.fullName}
            onInput={this.InputEvent}
            onChange={event => this.setState({fullName: event.target.value})}
          />
         
          {formErrors.fullName.length > 0 && (
                <span className="errorcolor">{formErrors.fullName}</span>
              )}
        </FormGroup>
        <FormGroup controlId="email"  bssize="large">
          <FormLabel>Gmail :</FormLabel>
          <FormControl
            className= {formErrors.emailName.length > 0 ? "error" : null}
            type="email"
            name="emailName"
            placeholder="name@example.com"
            noValidate
            value={this.state.emailName}
            onInput={this.InputEvent}
            onChange={event => this.setState({emailName: event.target.value})}
          />
          {formErrors.emailName.length > 0 && (
                <span className="errorcolor" >{formErrors.emailName}</span>
              )}
        </FormGroup>

         <FormGroup controlId="mob" bssize="large">
         <FormLabel>Mobile Number :</FormLabel>
          <FormControl
            name="mobName"
            type="tel"
            placeholder="Enter Mobile Number"
            noValidate
            value={this.state.mobName}
            onInput={this.InputEvent}
            onChange={event => this.setState({mobName: event.target.value})}                 
          /> 
          {formErrors.mobName.length > 0 && (<span className="errorcolor" >{formErrors.mobName}</span>)}
        </FormGroup>
        <FormGroup controlId="dob" bssize="large">
          <FormLabel>Date of Birth :</FormLabel>
          <FormControl
            type="date"
            name="dateName"
            noValidate
            value={this.state.dateName}
            onInput={this.InputEvent}
            onChange={event => this.setState({dateName: event.target.value})}
          />
        </FormGroup>
          {formErrors.dateName.length > 0 && (<span className="errorcolor" >{formErrors.dateName}</span>)}


        <FormGroup controlId="username" bssize="large">
          <FormLabel>Username :</FormLabel>
          <FormControl
            type="text"
            name="userName"
            placeholder="Create Username"
            noValidate
            value={this.state.userName}
            onInput={this.InputEvent}
            onChange={event => this.setState({userName: event.target.value})}
          />
          {formErrors.userName.length > 0 && (
                <span className="errorcolor">{formErrors.userName}</span>
              )}
        </FormGroup>

        <FormGroup controlId="password" bssize="large">
          <FormLabel >Password :</FormLabel>
          <FormControl
            placeholder="Create Password"
            name="passwordName"
            type="password"
            noValidate
            value={this.state.passwordName}
            onInput={this.InputEvent}
            onChange={event => this.setState({passwordName: event.target.value})}
          />
          {formErrors.passwordName.length > 0 && (
                <span className="errorcolor">{formErrors.passwordName}</span>
              )}
        </FormGroup>

        <FormGroup  bssize = "large">
         Gender:
          <input 
                  
                  type="radio" 
                  id="male" 
                  value="Male" 
                  checked={this.state.gender === "Male"}
                  onChange={this.handleRadioChange}
                  name="male" 
          /> Male
          <input 
                 
                  type="radio" 
                  id="female" 
                  value="Female" 
                  checked={this.state.gender === "Female"}
                  onChange={this.handleRadioChange}
                  name="female" 
          /> Female
          <input 
                  
                  type="radio" 
                  id="other" 
                  value="Other" 
                  checked={this.state.gender === "Other"}
                  onChange={this.handleRadioChange}
                  name="other" 
          /> Other
        </FormGroup>
         {formErrors.gender.length > 0 && (
                <span className="errorcolor">{formErrors.gender}</span>
              )}
             
        <Button block   type="submit" onClick={this.onCreateUser}>
          Register
        </Button>
        <Link to="/signin">
        <Button variant="Outlined">Already Registered?</Button>
        </Link> 
      </form>
   </div>
    </div>
</div>
      )
  }
}

export default Register;