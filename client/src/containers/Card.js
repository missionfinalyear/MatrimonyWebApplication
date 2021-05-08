import React,{ useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';


import { red } from '@material-ui/core/colors';


import axios from 'axios';
import Timeline from './Timeline.js';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Cardi() {
  
  const [profiles,getprofiles] = useState('');

  const url = 'http://localhost:3001/';

  useEffect(() =>{
    getAllProfiles();
  }, []);

  const getAllProfiles = () =>{
    axios.get(`${url}getprofiles`,{
          headers: {
            "x-access-userid" : localStorage.getItem("id"),
          },
        })
    .then((response) => {
      const allProfiles = response.data;
      console.log(response);
      getprofiles(allProfiles);
    })
    .catch(error => console.log(`Error: ${error}`));
  }

  return (
    <Timeline profiles = {profiles}/>
    )
}