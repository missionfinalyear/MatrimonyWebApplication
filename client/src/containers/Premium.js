import React from 'react';  
import { Modal, Form } from 'react-bootstrap';
import PremiumInfo from './PremiumInfo';
import PremiumMembership from './PremiumMembership';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Card from 'react-bootstrap/Card';


export default class Premium extends React.Component {  
    constructor(props) {
    super(props);
       this.state = {
        isPremium: localStorage.getItem("ispremium")
      };
  }
 

  render() {
    const isPremium = this.state.isPremium;
    let button;
    console.log(isPremium);
    if (isPremium==1) {
      button = <PremiumInfo/>;
    } else {
      button = <PremiumMembership/>;
    }
return (  
        <>  
         <br/>  
       <br/>  
        <br/>  
         <Card className="justify-content-center">
    <Card.Title className="text-center" >
        Catch The Match Premium Plan
      </Card.Title>
      <Card.Body className="text-center" >
         {button}
      </Card.Body>
    </Card>
 
 </>

);  
}  
}  









