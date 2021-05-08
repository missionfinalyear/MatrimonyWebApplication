import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'
import { Link} from "react-router-dom";
import axios from 'axios';

export default function ChatLogin({onIdSubmit}) {
  const idRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()

    onIdSubmit(idRef.current.value)
  }

  function createNewId() {
    const newid = uuidV4();
    console.log(newid);
    onIdSubmit(newid);
    const data = {
      id : newid,
      userid : localStorage.getItem("id")
    }
    axios.post("http://localhost:3001/savechatid",data).then((response) =>
      alert(JSON.stringify(response.data)));

}
    

  return (
    <div className="Button" style={{paddingLeft:"30px", paddingTop:"10px"}}>
                    <Link to="/dashboard">
                 <Button style={{ borderRadius: "12px", fontSize:"30px", fontWeight:"bold", paddingLeft:"10px"}} > Back </Button>
               </Link>
    
    <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
    
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>   
        <Button type="submit" className="mr-2">Login</Button>
        <Button onClick={createNewId} variant="secondary">Create A New Id</Button>
      </Form>
    </Container>
     </div>
  )
}


















// import React, {useState, useRef} from 'react';
// import {Container, Form, Button } from 'react-bootstrap';
// import {v4 as uuidv4} from 'uuid';

// export default function ChatLogin({onIdSubmit}) {
//   const idRef = React.useRef();

//   function handleSubmit(e){
//     e.preventDefault();
//     alert(idRef.current.value);
//     onIdSubmit(idRef.current.value);
//   };

//   function createNewId(){
    
//   }

//   return (
//      <Container>
//      <Form onSubmit={this.handleSubmit} >
//       <Form.Group>
//         <Form.Label>Enter ID: </Form.Label>
//         <Form.Control type='text' ref={idRef} required/>
//       </Form.Group>
//       <Button type='submit' className="mr-2">Lets Chat</Button>
//       <Button onClick={createNewId} variant='secondary' >Create New Id</Button>
//      </Form>
     
//      </Container>
//    );
// }


