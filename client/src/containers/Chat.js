import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//import "./Chat.css";
import Chatbody from "../components/chatbody/Chatbody.js";

export default function Chatss({id}) {
  
  return(
      
        <>
       <div className = "container h-100 d-flex justify-content-center">
        <div className = "chat-container">
       	<Chatbody id={id}/>
        
        </div>
       </div>
        </>
      
    );

}
