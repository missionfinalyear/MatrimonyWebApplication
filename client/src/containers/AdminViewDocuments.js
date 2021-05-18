import React from 'react';
import {  Table } from "semantic-ui-react";
import { Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Card from 'react-bootstrap/Card';

export default function AdminViewDocuments(props){

	// console.log(props.userlist);
	

	const DisplayList = (props) => {

		const {userlist} = props;
    // console.log(userlist);

     const url = 'http://localhost:3001/upload/';
  

		if (userlist.length>0){
			console.log(userlist.length);

	return(
    <div>
    <div className="Button" style={{paddingLeft:"30px", paddingTop:"10px"}}>
                    <Link to="/admindashboard">
                 <Button style={{ borderRadius: "12px", fontSize:"30px", fontWeight:"bold", paddingLeft:"10px"}} > Back </Button>
               </Link>
               </div>
               <div style={{paddingLeft:"550px",paddingTop:"100px"}}>
        <Card style={{paddingLeft:"50px", width: "500px"}}>
        <Card.Title className="text-center" >
            </Card.Title>
            <Card.Body  style={{width: "400px"}}>
		<Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User Id</Table.HeaderCell>
            <Table.HeaderCell>Document</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userlist.map(el => {
            return (
              <Table.Row key={el.userid}>
                <Table.Cell>{el.userid}</Table.Cell>

                <Table.Cell onClick={()=> window.open(url+el.doc, "_blank")}>
                  view Document
                  </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
     </Card.Body>
      </Card>
      </div>
      </div>
    );
	}
	}


	return(
	    <>
		{DisplayList(props)}
		</>
	)	
}