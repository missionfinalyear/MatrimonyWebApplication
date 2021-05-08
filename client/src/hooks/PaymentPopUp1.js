import React from 'react';  
import './PopUpStyle.css';  
import {Card, CardTitle, CardBody} from '@progress/kendo-react-layout';
import styled from "styled-components";
import PaymentPopUp2 from './PaymentPopUp2.js';


const theme = {
  blue: {
    default: "#283593",
    hover: "blue"
  }
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 10px;
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
padding: 3px 6px;
border-radius: 30px;
}
`;


export default class PaymentPopUp1 extends React.Component {  
  constructor(props){
    super(props);
    this.state = { showPopup: false }; 
    this.paymentPopUp2 = this.paymentPopUp2.bind(this);
  }

  paymentPopUp2() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
     }
  render() {  
return (  
<div className='popup1'> 
<div className='popup\_inner1'>  
<div style={{float: 'right'}}>
<Button1 onClick={this.props.closePopup}><b>X</b></Button1>
</div>
<div >
<h3>Upgrade your Search Experience with our Perfect Plans</h3>   
<Card style={{ width: 200 }}>
                <CardBody>
                  <CardTitle>Features of Premium Profile Upgrade</CardTitle>
                  <CardTitle>Card Subtitle</CardTitle>
                  <p>Message and Chat with Unlimited Users</p>
                  <p>View Contacts of Members you Like</p>
                  <p>Make your Contact Visible to others</p>
                  <p>Profile Boost</p>
                  <p>And Many More.......</p>
                  <h3>
                    <p>Come and Grab the Offer</p>
                    <p>Hurry!!! Come and Grab the Offer Valid for Limited Time</p>
                  </h3>
                </CardBody>
  </Card>
</div>
<div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
            }}>
<Button type="Button"  onClick={this.paymentPopUp2.bind(this)}>Proceed to Pay</Button>
</div>
{this.state.showPopup ?  
          <PaymentPopUp2    
              closePopup={this.paymentPopUp2.bind(this)}  
          />  
          : null  
} 
</div>  
</div>  
);  
}  
}  
