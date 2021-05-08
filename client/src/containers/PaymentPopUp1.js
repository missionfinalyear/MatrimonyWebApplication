import React from 'react';  
import './PopUpStyle.css';  
import {Card, CardTitle, CardBody} from '@progress/kendo-react-layout';
import styled from "styled-components";
import PaymentPopUp2 from './PaymentPopUp2.js';
import { Modal, Form } from 'react-bootstrap'



const theme = {
  blue: {
    default: "#283593",
    hover: "blue"
  }
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  font-size: 15px;
  padding: 10px 60px;
  border-radius: 8px;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
`;

Button.defaultProps = {
  theme: "blue"
};

const Button1 = styled.button`
padding: 2px 3px;
border-radius: 30px;
}
`;


export default class PaymentPopUp1 extends React.Component {  
  // constructor(props){
  //   super(props);

  //   this.state = { showPopup: false }; 
  //   this.paymentPopUp2 = this.paymentPopUp2.bind(this);
  // }

  // paymentPopUp2() {  
  //   this.setState({  
  //        showPopup: !this.state.showPopup  
  //   });  
  //    }
  state={
        openModal : false
    }

    onClickButton = e =>{
        e.preventDefault()
        this.setState({openModal : true})
    }

    onCloseModal = ()=>{
        this.setState({openModal : false})
    }

  render() {  
return (  

   <Modal.Dialog>
    <Modal.Header >
         <Modal.Title className="text-center">Upgrade your Search Experience with our Perfect Plans</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Group > 
            <ul>
                  <li>Message and Chat with Unlimited Users</li>
                  <li>View Contacts of Members you Like</li>
                  <li>Make your Contact Visible to others</li>
                  <li>Profile Boost</li>
                  <li>And Many More.......</li>
           </ul>
          </Form.Group>
          <Button onClick={this.onClickButton} type="submit">Proceed to Pay</Button>
          <Button onClick={this.onCloseModal} variant="secondary">cancel</Button>
        </Form>
        <Modal show={this.state.openModal} onHide={this.onCloseModal}>
                   <PaymentPopUp2/>
        </Modal> 
      </Modal.Body>
    </Modal.Dialog>

);  
}  
}  
