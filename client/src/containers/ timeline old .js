import React from 'react';
//import { Button} from "react-bootstrap";
import Web3 from 'web3';
import { LikedProfileAbi } from '../abi/LikedProfileAbi.js';
import Axios from "axios";
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


const web3 = new Web3(Web3.givenProvider);
const contractAddr='0xe26109Ae16aAfB5a643757F300700b54025C184A';
const LikedProfile = new web3.eth.Contract(LikedProfileAbi, contractAddr);


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
    paddingLeft:"550px",
    paddingTop:"20px"
  }

});


export default function Timeline(props){
	console.log(props.profiles);

    const classes = useStyles();

	const displayProfiles = (props) => {
	const {profiles} = props;
     
    const onLikedUser = username => async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    await LikedProfile.methods.likedlog(account,1,web3.utils.fromAscii(username)).send({
      from: accounts[0]
    });
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
    
				profiles.map((profile,index) => {
					
					return(      
            <div className={classes.profiles} >
						<Card className={classes.root}>
      <CardActionArea>
        <CardMedia 
          className={classes.media}
          component="img"
          alt="Profile Picture"
          height="200"
          image={`data:image/png;base64,${toBase64(profile.dp.data)}`}
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
        <IconButton aria-label="add to favorites" onClick={onLikedUser(profile.username)}>
          <FavoriteIcon />
        </IconButton>
        <Button size="small" color="primary">
          View Profile
        </Button>
      </CardActions>
    </Card>
    <br>
    </br>
			</div>
    
       
						);
				}
      
        )
			)
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