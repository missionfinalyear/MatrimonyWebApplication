import React,{useState,Component,useReducer} from 'react';
import Select from 'react-select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';


const MaritalstatusOptions=[
  { value: 'Single', label: 'Single' },
  { value: 'Divorced', label: 'Divorced' },
  { value: 'Widow', label: 'Widow' }
]
const ReligionOptions = [
  { value: 'Hindu', label: 'Hindu' },
  { value: 'Muslim', label: 'Muslim' },
  { value: 'Sikh', label: 'Sikh' },
  { value: 'Baudh', label: 'Baudh' },
  { value: 'Others', label: 'Others'}
]
const EatingHabitsOpt = [

  { value: 'Vegan', label: 'Vegan' },
  { value: 'Vegetarian', label: 'Vegetarian' },
  { value: 'Non-Vegetarian', label: 'Non-Vegetarian' }

]
const countryList = [

  { id: 'Af', label: 'Afghanistan'},
  { id: 'Ab', label: 'Albania'},
  { id: 'Au', label: "Australia" },
  { id: 'Br', label: "Brazil" },
  { id: 'Ch', label: "China" },
  { id: 'Dn', label: "Denmark" },
  { id: 'Eq', label: "Egypt" },
  { id: 'Fn', label: "Finland" },
  { id: 'Gh', label: "Ghana" },
  { id: 'Hu', label: "Hungary" },
  { id: 'In', label: "India" },
  { id: 'Jn', label: "Japan" }

]

export default function BasicDetails() {
  
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
    maritalstatus: '',
    religion: '',
    eatinghabits: '',
    country: '',
    }
  );
  const handleChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({[name]: newValue});
  }

  return (
    <React.Fragment>
   
      <Typography variant="h6" gutterBottom>
        Basic details
      </Typography>
       <div className="container h-100 d-flex justify-content-center">
      <Grid container spacing={4}>        

        <Grid item xs={12} sm={6}>
          <label>Marital Status:</label>
          <Select options={MaritalstatusOptions} name="maritalstatus" placeholder="choose" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>Religion:</label>
          <Select options={ReligionOptions} name= "religion" placeholder="choose" onChange={handleChange}/>
        </Grid>

        <Grid item xs={12} sm={6}> 
        <label>Eating Habits :</label>
        <Select options={EatingHabitsOpt} name= "eatinghabits" placeholder="choose" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>Country of Residence:</label>
          <Select options={countryList} name= "country" placeholder="choose" onChange={handleChange}/>
        </Grid>
          
      </Grid>
      </div>
    </React.Fragment>
  );
}
