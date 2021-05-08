import React from 'react';  
import './PopUpStyle.css';  
import styled from "styled-components";
import Axios from "axios";
import { Modal, Form } from 'react-bootstrap'
import { Redirect,Link,Switch,Route,Router } from "react-router-dom";
import Web3 from 'web3';
import { PaymentAbi } from '../abi/PaymentAbi';


const web3 = new Web3(Web3.givenProvider);
const contractAddr='0xeF38F745934dB10c0c851ee5049cCaB8d3a176DA';
const Payment = new web3.eth.Contract(PaymentAbi, contractAddr);

const theme = {
  blue: {
    default: "#283593",
    hover: "blue"
  }
};

const Button = styled.button`
  background-color: #283593;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 8px;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  &:hover {
    background-color: black;
  }
`;

//const onPayment = async (event) => {
  //  event.preventDefault();

    //const accounts = await web3.eth.getAccounts();
    //const account = accounts[0];

    //await Payment.methods.accept().send({
      //from: accounts[0]
    //});
   //this.setState({isPremium: 1});
    //console.log(this.state.isPremium);
     //Axios.post("http://localhost:3001/premium",{
      //isPremium: this.state.isPremium,
      //id : localStorage.getItem("id"),
     //})
       // .then(() => alert("successful inserted Your account is premium now"));
       //console.log(`            
         //   isPremium: ${this.state.isPremium},
          
        //`)
    //};

export default class PaymentPopUp2 extends React.Component {  
    constructor(props) {
    super(props);
    this.onClickButton = this.onClickButton.bind(this);
    this.state = {isPremium: 0};
  }
    async onClickButton(event) {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    await Payment.methods.accept().send({
      from: accounts[0]
    });
    this.setState({isPremium: 1});
    console.log(this.state.isPremium);
      Axios.post("http://localhost:3001/premium",{
      isPremium: this.state.isPremium,
      id : localStorage.getItem("id"),
     })
        .then((response) => alert(JSON.stringify(response.data)));
       console.log(`            
            isPremium: ${this.state.isPremium},
          
        `)
       

    
  }

  render() {
    if(this.state.isPremium==1){
        return <Redirect to={{pathname: "/dashboard"}} />
       }else{

return (  
        <>  
         <br/>  
       <br/>  
        <br/>  
         <Modal.Dialog>

    <Modal.Header >
         <Modal.Title className="text-center">Payments Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form >
          <Form.Group >
                     <b>Payment Transaction is done using Ethers</b>
                     <br/>
                     <p>The Premium Package Upgrade reguires payment of Rs1000</p>
                     <p>The Equivalent Payment Transaction in Ether is 0.004775 Ethers.</p> 
          </Form.Group>
          <div className="text-center">
          <Button onClick={this.onClickButton} type="submit">Pay</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal.Dialog>
 </>
); 
} 
}  
}  
