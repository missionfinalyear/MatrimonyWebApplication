import React from 'react';
import "./Chatbody.css";
import ChatList from "../chatlist/ChatList";
import ChatContent from "../chatContent/ChatContent";
import OpenConversation from '../chatContent/OpenConversation.js';
import {useConversations} from "../contexts/ConversationProvider.js";
import { Link} from "react-router-dom";
import {  Button } from 'react-bootstrap'

//import ChatContent from "../chatContent/ChatContent";

export default function Chatbody({id}) {

	const { selectedConversation } = useConversations()
	
	return( 
		<div className="Button" style={{paddingLeft:"30px", paddingTop:"10px"}}>
                    <Link to="/dashboard">
                 <Button style={{ borderRadius: "12px", fontSize:"30px", fontWeight:"bold", paddingLeft:"10px"}} > Back </Button>
               </Link>
		<div className = "main_chatbody">
		
		<ChatList id={id} />
		{selectedConversation && <OpenConversation />}
		</div>
		</div>
		
	);
}