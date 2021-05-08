import React from 'react';
import axios from 'axios';
import { useEffect, useState} from 'react';
import LikeTimeline from "./LikeTimeline.js";

export default function MyLikedProfile(props){
	

	const [profiles,getprofiles] = useState('');

  const url = 'http://localhost:3001/';

  useEffect(() =>{
    getAllProfiles();
  }, []);

  const getAllProfiles = () =>{
    axios.get(`${url}getmappeduser`,{
          headers: {
            "x-access-userid" : localStorage.getItem("id") ,
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
    <LikeTimeline profiles = {profiles}/>
		)
}

