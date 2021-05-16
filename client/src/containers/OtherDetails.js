import React,  {useState,Component,useReducer,useEffect}  from 'react';
import Select from 'react-select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
//import AsyncSelect from 'react-select/async';




export default function OtherDetails(){

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
    WorkingProfession: '',
    Height: '',
    Weight: '',
    Address: '',
    AdditionalInformation: '',
    
    }
  );

  const handleChange = (value) => {
    setUserInput({[value.target.name]: value.target.value});
  }

  useEffect(() => {
  console.log(userInput)
   }, [userInput])


  const handleSubmit = () => {

    const data = {

      id : localStorage.getItem("id"),
      WorkingProfession : userInput.WorkingProfession,
      Height : userInput.Height,
      Weight : userInput.Weight,
      Address :  userInput.Address,
      AdditionalInformation : userInput.AdditionalInformation,
    
    };


    Axios.post("http://localhost:3001/otherdetails",data).then((response) => {
      alert(JSON.stringify(response.data))
    })
   
  }

  return(
    <React.Fragment>
    <Typography variant="h6" gutterBottom>
      Other Details
    </Typography>
    <div className="container h-100 d-flex justify-content-center">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={0}>
          <TextField
            id="Work"
            name="WorkingProfession"
            label="Working Profession"
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
        <TextField
            
            id="Height"
            name="Height"
            label="Height(In Feet)"
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            
            id="Weight"
            name="Weight"
            label="Weight(In Kg's)"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField            
            id="Address"
            name="Address"
            label="Address"
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField            
            id="AddInfo"
            name="AdditionalInformation"
            label="Your Expectations"
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
        <Button variant="outlined" onClick={handleSubmit}> Submit < /Button>
        </Grid>
      
        </Grid>
        </div>
</React.Fragment>
  );
}




