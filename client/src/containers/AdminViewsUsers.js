import React from 'react';
import {  Table } from "semantic-ui-react";
import { Link} from "react-router-dom";
import Button from '@material-ui/core/Button';

export default function AdminViewsUsers(props){

	console.log(props.userlist);
	

	const DisplayList = (props) => {

		const {userlist} = props;

		if (userlist.length>0){
			console.log(userlist.length);

	return(
    <div>
    <div className="Button" style={{paddingLeft:"30px", paddingTop:"10px"}}>
                    <Link to="/admindashboard">
                 <Button style={{ borderRadius: "12px", fontSize:"30px", fontWeight:"bold", paddingLeft:"10px"}} > Back </Button>
               </Link>
               </div>
      <div style={{paddingLeft:"340px",fontSize:"20px", fontWeight:"bold" }}>
		<Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User Id</Table.HeaderCell>
            <Table.HeaderCell>Full Name</Table.HeaderCell>
            <Table.HeaderCell>View Profile</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {userlist.map(el => {
            return (
              <Table.Row key={el.userid}>
                <Table.Cell>{el.userid}</Table.Cell>
                <Table.Cell>
                  {el.username}
                </Table.Cell>
                <Table.Cell>
                <Link to = {{pathname:"/adminviewuser", state:{id: el.userid}}}>
                 Click here
                 </Link>
                  </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
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