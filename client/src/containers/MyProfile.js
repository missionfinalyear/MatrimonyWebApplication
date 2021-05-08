import React,{ useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios'
import '../App.css';
import {Route,Switch,Link,BrowserRouter,Redirect } from "react-router-dom";
import { Button} from "react-bootstrap";
import MyData from "./MyData.js";


export default function MyProfile() {

    const [myprofiles,getprofile] = useState('');

    const url = 'http://localhost:3001/';

    useEffect(() =>{
    getuserinfo();
  }, []);
 

	const getuserinfo = () => {
                Axios.get(`${url}myprofile`,{
        	headers: {
        		"x-access-userid" : localStorage.getItem("id"),
        	},
        }).then((response) => {
        	const myProfileinfo = response.data;
            console.log(response);
            getprofile(myProfileinfo);
           
        }).catch(error => console.log(`Error: ${error}`));
      
	};
	return (
    <MyData myprofiles = {myprofiles} />
   
    )

}