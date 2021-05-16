import React, {Component} from 'react';
import Switch from 'react-switch'; 
import Grid from '@material-ui/core/Grid';
import styled from "styled-components";
import Typography from '@material-ui/core/Typography';
import { Modal, Form } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from "react-router-dom";

//import TextField from '@material-ui/core/TextField';

const theme = {
  blue: {
    default: "#283593",
    hover: "blue"
  }
};

const Button = styled.button`
  background-color: #283593;
  color: white;
  font-size: 15px;
  padding: 10px 60px;
  border-radius: 8px;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  &:hover {
    background-color: blue;
  }
`;


export default class PremiumInfo extends Component {

    constructor(props){
        super(props);
        this.state={
            checked1: false,
            checked2: false,
            checked3: false,
            textAreaValue: '',
            redirect: false,
        };
        this.handleChange1 = this.handleChange1.bind(this)
        this.handleChange2 = this.handleChange2.bind(this)
        this.handleChange3 = this.handleChange3.bind(this)  
        this.handleChange = this.handleChange.bind(this)
        this.onClickButton = this.onClickButton.bind(this)
    }

    handleChange1(checked1){
      this.setState({checked1})
    }

    handleChange2(checked2){
      this.setState({checked2})
    }
    
    handleChange3(checked3){
      this.setState({checked3})
    }

    handleChange(event) {
      this.setState({ textAreaValue: event.target.value });
    }

   onClickButton = (e) => {
    e.preventDefault();
    const data = {
      id : localStorage.getItem("id"),
      contact : this.state.checked1,
      address : this.state.checked2,
      email : this.state.checked3,
      queries : this.state.textAreaValue,
    }
     console.log("ok")

    
    Axios.post("http://localhost:3001/premiumoptions",data).then((response) => {
      alert(response.data)
    })


   this.setState({redirect: true});

   }

  render() {
    console.log(this.state)
    if(this.state.redirect){
        return <Redirect to={{pathname: "/dashboard"}} />
       }else{

    return (
      <React.Fragment>
     <Modal.Dialog>
      <Modal.Header >
         <Modal.Title className="text-center">Premium Options</Modal.Title>
      </Modal.Header>
       <Form >
          <Form.Group > 
                   <div className="container h-100 d-flex justify-content-center">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={0}>
           <label>Make your Contacts Visible to Others:</label>
          <Switch
                ClassName="react-switch"
                onChange={this.handleChange1}
                checked={this.state.checked1}
          />


          <p>The Contact Details are <b>{this.state.checked1?'Visible' : 'Not Visible'}</b></p>
          </Grid>
          
          <Grid item xs={12} sm={0}>
           <label>Make your Address Visible to Others:</label>
          <Switch
                ClassName="react-switch"
                onChange={this.handleChange2}
                checked={this.state.checked2}
          />
          <p>The Address information is <b>{this.state.checked2?'Visible' : 'Not Visible'}</b></p>
          </Grid>

          <Grid item xs={12} sm={0}>
           <label>Make your Email-ID Visible to Others:</label>
          <Switch
                ClassName="react-switch"
                onChange={this.handleChange3}
                checked={this.state.checked3}
          />
          <p>The Email-ID is <b>{this.state.checked3?'Visible' : 'Not Visible'}</b></p>
          </Grid>


          <Grid item xs={12} sm={0}>
          <label><b>In case of any queries, Please write to us Here:</b></label>
          <textarea
              value={this.state.textAreaValue}
              onChange={this.handleChange}
              rows={10}
              cols={60}
          />

          </Grid> 
        </Grid>
        </div>
          </Form.Group>
          <div className="text-center">
          <Button onClick= {this.onClickButton} type="submit">Submit</Button>
          </div>
        </Form>      
      </Modal.Dialog>
    </React.Fragment>
  );
}
  }
}