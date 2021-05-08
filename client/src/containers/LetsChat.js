import React from 'react';
import Chatss from "../containers/Chat.js";
import ChatLogin from "../components/chatlist/chatLogin.js"
import useLocalStorage from '../hooks/useLocalStorage.js';
import {ContactsProvider} from "../components/contexts/ContactsProvider.js";
import {ConversationProvider} from "../components/contexts/ConversationProvider.js";
import { SocketProvider } from '../components/contexts/SocketProvider.js';
import OpenConversation from '../components/chatContent/OpenConversation.js';
import { Link,Switch,BrowserRouter,Route} from "react-router-dom";
import { Button} from "react-bootstrap";


export default function LetsChat(){

	const [id, setId] = useLocalStorage('id');
  const chatt = (
      <SocketProvider id = {id}>
        <ContactsProvider>
          <ConversationProvider id={id}>
            <Chatss id = {id}/> 
          </ConversationProvider>
        </ContactsProvider>
      </SocketProvider> 
    )


    return(
    
    id ? chatt : <ChatLogin onIdSubmit={setId} />

    )
}