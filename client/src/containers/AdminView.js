import React from 'react';
import axios from 'axios';
import { useEffect, useState} from 'react';
import UserDataAdmin from "./UserDataAdmin.js";

export default function AdminViewProfile(props){
	console.log(props.location.state.id);

	const [profiles,getprofiles] = useState('');

  const url = 'http://localhost:3001/';

  useEffect(() =>{
    getAllProfiles();
  }, []);

  const getAllProfiles = () =>{
    axios.get(`${url}getuser`,{
          headers: {
            "x-access-userid" : props.location.state.id ,
          },
        })
    .then((response) => {
      const allProfiles = response.data;
      console.log(response);
      getprofiles(allProfiles);
    })
    .catch(error => console.log(`Error: ${error}`));
  }

	return(
    <UserDataAdmin myprofiles = {profiles}/>
		)
}
