import React from 'react';
//import { Button} from "react-bootstrap";
import Web3 from 'web3';
import { LikedProfileAbi } from '../abi/LikedProfileAbi.js';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";


const web3 = new Web3(Web3.givenProvider);
const contractAddr='0xe26109Ae16aAfB5a643757F300700b54025C184A';
const LikedProfile = new web3.eth.Contract(LikedProfileAbi, contractAddr);
const url = "http://localhost:3001/upload/"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  },

  media:{
    padding:"10px 10px 10px 10px"
  },

  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px"
  },

  profiles:{
    display: "flex",
    flexWrap: "wrap",
    paddingLeft:"110px",
    paddingTop:"20px"
  }

});


export default function Timeline(props){
  console.log(props.profiles);

    const classes = useStyles();

  const displayProfiles = (props) => {
  const {profiles} = props;
     
    const onLikedUser = (username,userid) => async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    await LikedProfile.methods.likedlog(account,1,web3.utils.fromAscii(username)).send({
      from: accounts[0]
    });

    const data = {
      id : localStorage.getItem("id"),
      userid : userid
    }

    axios.post("http://localhost:3001/mapping",data).then((response) =>
      alert(JSON.stringify(response.data)));
    };

  
    
    if (profiles.length>0){
      console.log(profiles.length);

      function toBase64(arr) {
                    arr = new Uint8Array(arr) //if it's an ArrayBuffer
            return btoa(
             arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        }   

      return(
        <div className="Button" style={{paddingLeft:"30px", paddingTop:"10px"}}>
                    <Link to="/dashboard">
                 <Button style={{ borderRadius: "12px", fontSize:"30px", fontWeight:"bold", paddingLeft:"10px"}} > Back </Button>
               </Link>
        <div className={classes.profiles} >
         <Grid
                container
                spacing={2}
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
        {profiles.map(profile => (
          <Grid item xs={12} sm={6} md={4}>      
            
            <Card className={classes.root}>
      <CardActionArea>
        <CardMedia 
          className={classes.media}
          component="img"
          alt="Profile Picture"
          height="200"
         // image={`data:image/png;base64,${toBase64(profile.dp.data)}`}
         image={url+profile.dp}
          title="DP"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {profile.username}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {profile.age} 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
   
            {profile.profession}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="add to favorites" onClick={onLikedUser(profile.username,profile.userid)}>
          <FavoriteIcon />
        </IconButton>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to = {{pathname:"/viewuser", state:{id: profile.userid}}}>
        <Button size="small" color="primary">
                      View Profile
        </Button>
        </Link>
      </CardActions>
    </Card>
    <br>
    </br>
    </Grid>
    ))}
    </Grid>
</div>
      </div>
            );
        }
else{
  return (<h3> No Profiles </h3>)
}
  }

  return(
    <>
    {displayProfiles(props)}
    </>
    )
}