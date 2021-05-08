import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import AdminViewsUsers from '../containers/AdminViewsUsers.js';

export default function AllUsersAdmin(){
    
   const [profiles,getprofiles] = useState('');

  const url = 'http://localhost:3001/';

  useEffect(() =>{
    getAllProfiles();
  }, []);

  const getAllProfiles = () =>{
    axios.get(`${url}adminviewusers`)
    .then((response) => {
      const allProfiles = response.data;
      console.log(response);
      getprofiles(allProfiles);
    })
    .catch(error => console.log(`Error: ${error}`));
  }
	return(
        <AdminViewsUsers userlist = {profiles}/>

		)
}