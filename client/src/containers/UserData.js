import React from 'react';
import Axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Card from 'react-bootstrap/Card';


var moment = require('moment');
const url = "http://localhost:3001/upload/"

export default function UserData(props){

  console.log(props.myprofiles);

  const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

      

  const DisplayUserProfile = (props) => {

    const {myprofiles} = props;
        const classes = useStyles();

    if (myprofiles.length>0){
      console.log(myprofiles.length)

            function toBase64(arr) {
                    arr = new Uint8Array(arr) //if it's an ArrayBuffer
            return btoa(
             arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        }

      return(
                myprofiles.map((me,index) => {
                  console.log(me);
                  const {data} = me.dp;
                  
                  return(
                    <div style={{ padding:"30px 10px"}}>
                    <Link to="/profilefeed">
                   <Button style={{ borderRadius: "12px", fontSize:"30px", fontWeight:"bold", paddingLeft:"10px"}} > Back </Button>
                   </Link>
                    <div className="Button" style={{paddingLeft:"300px", paddingTop:"10px"}}>
                <Card style={{paddingLeft:"50px", width: "900px"}}>
               <Card.Title className="text-center" >
                 </Card.Title>
                
                    
                    <div className='dp' key={me.userid} style= {{paddingLeft:"400px"}}>
                    
                    <img src={url+me.dp} alt="dp" style={{height:"200px", width:"200px" , paddingTop:"20px",paddingLeft:"20px",paddingRight:"20px",paddingBottom:"20px", border:"5px", borderRadius:"50%"}}/>
                        
                        <p style={{padding:"0px 550px 100px 10px"}}> {me.username},{me.age}
                        <br></br>
                        {me.profession}
                        <Card.Body  style={{width: "400px"}}>
                        <hr style={{height:"30px",color:"red"}}/>  
                     <ul>
                     <li key="{me.dob}"><p > Date of Birth : {moment(me.dob).format('DD MMM, YYYY') }</p></li>
                     <li key="{me.gender}"><p  > Gender : {me.gender}</p></li>
                     <li key="{me.nationality}"><p  > Nationality : {me.nationality}</p></li>
                     <li key="{me.languagesknown}"><p  > Languages known : {me.languagesknown}</p></li>
                     </ul>
                     </Card.Body>
                     </p>
                     </div>
                     </Card>
                     </div>
                     </div>
                    )
                })
        )
    }
    else{
      return (<h3> No Profile Found </h3>)
    }
  }

  return(
    <>
    {DisplayUserProfile(props)}
    </>
    )
}