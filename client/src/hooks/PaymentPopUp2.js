import React from 'react';  
import './PopUpStyle.css';  
import styled from "styled-components";
import {Card, CardTitle, CardBody} from '@progress/kendo-react-layout';

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

export default class PaymentPopUp2 extends React.Component {  

  render() {  
return (  
<div className='popup2'> 
<div className='popup\_inner2'>  
<div style={{float: 'right'}}>
<Button onClick={this.props.closePopup}><b>X</b></Button>
</div>
<div>
<h3>Payments Details</h3>

<Card style={{ width: 200 }}>
                <CardBody>
                  <CardTitle>Payment Transaction is done using Ethers</CardTitle>
                  <p>The Premium Package Upgrade reguires payment of Rs1000</p>
                  <p>The Equivalent Payment Transaction in Ether is 0.004775 Ethers.</p>
                </CardBody>
  </Card>
<button onClick={this.handleClick}>Pay</button>
</div>
</div>  
</div>  
);  
}  
}  
