import React,{useState,Component,useReducer,useEffect} from 'react';
import Select from 'react-select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';


const MaritalstatusOptions=[
  { value: 'Unmarried', label: 'Unmarried' },
  { value: 'Divorced', label: 'Divorced' },
  { value: 'Widow', label: 'Widow' }
]
const ReligionOptions = [
  { value: 'Hindu', label: 'Hindu' },
  { value: 'Muslim', label: 'Muslim' },
  { value: 'Sikh', label: 'Sikh' },
  { value: 'Bauddha', label: 'Bauddha' },
  { value: 'Others', label: 'Others'}
]

const CasteOptions = [
  { value: 'Maratha', label: 'Maratha' },
  { value: 'Gujrati', label: 'Gujrati' },
  { value: 'Jain', label: 'Jain' },
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
const languageList = [

  { value: 'Marathi', label: 'Marathi'},
  { value: 'English', label: 'English'},
  { value: 'Hindi', label: "Hindi" },
  { value: 'Other', label: "Other" },
  

]

export default function BasicDetails() {
  const [selectedValue, setSelectedValue] = useState([]);
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
    maritalstatus: '',
    religion: '',
    eatinghabits: '',
    country: '',
    caste: '',
    languages: '',
    }
  );
  const handleChange = (value,c,event) => {
    console.log(c)
    console.log(event)
    console.log(value)
    const name = c.name;
    const newValue = value;
    if (name=="languages"){
      setUserInput(Array.isArray(c) ? c.map(x => ([name]: 'sad')) : []);
    }else{

    setUserInput({[name]: newValue});
  }
  }
 const handleChangelist = (e) =>{
  console.log(e)
  setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
 }

  useEffect(() => {
  console.log(userInput)
  console.log(selectedValue)
   }, [userInput,selectedValue])


  const handleSubmit = () => {

    const data = {

      id : localStorage.getItem("id"),
      maritalstatus : userInput.maritalstatus,
      religion : userInput.religion,
      eatinghabits : userInput.eatinghabits,
      country :  userInput.country,
      caste : userInput.caste,
      lang : selectedValue,
    };



    Axios.post("http://localhost:3001/editbasicdetails",data).then((response) => {
      alert(JSON.stringify(response.data))
    })
   
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
          <label>Caste:</label>
          <Select options={CasteOptions} name= "caste" placeholder="choose" onChange={handleChange}/>
        </Grid>

        <Grid item xs={12} sm={6}> 
        <label>Eating Habits :</label>
        <Select options={EatingHabitsOpt} name= "eatinghabits" placeholder="choose" onChange={handleChange}/>
        </Grid>

        <Grid item xs={12} sm={6}>
          <label>Country of Residence:</label>
          <Select options={countryList} name= "country" placeholder="choose" onChange={handleChange}/>
        </Grid>

        <Grid item xs={12} sm={6}>
          <label>Languages Known:</label>
          <Select  
          value={languageList.filter(obj => selectedValue.includes(obj.value))}
          options={languageList}
           name= "languages" placeholder="choose" onChange={handleChangelist}
          isMulti 
          isClearable/>
        </Grid>

        <Grid item xs={12} sm={6}>
        <Button variant="outlined" onClick={handleSubmit} > Submit < /Button>
        </Grid>
      </Grid>
      
      </div>
    </React.Fragment>
  );
}
