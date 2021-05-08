import React, { Component } from 'react';
import axios from 'axios';
import {Progress} from 'reactstrap';
//import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
//import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';


export default class UploadDocuments extends Component {

  constructor(props) {
    super(props);
      this.state = {
        selectedFile1: null,
        selectedFile2: null,
        selectedFile3: null,
        selectedFile4: null,
        selectedFile5: null,
        loaded:0  
      }
  }

  onChangeHandler1=event=>{
    console.log(event.target.files[0])
}

  onChangeHandler1=event=>{
    this.setState({
    selectedFile1: event.target.files[0],
    loaded:0
 })
}

onChangeHandler2=event=>{
  console.log(event.target.files[0])
}

onChangeHandler2=event=>{
  this.setState({
  selectedFile2: event.target.files[0],
  loaded:0
})
}

onChangeHandler3=event=>{
  console.log(event.target.files[0])
}

onChangeHandler3=event=>{
  this.setState({
  selectedFile3: event.target.files[0],
  loaded:0
})
}

onChangeHandler4=event=>{
  console.log(event.target.files[0])
}

onChangeHandler4=event=>{
  this.setState({
  selectedFile4: event.target.files[0],
  loaded:0
})
}

onChangeHandler5=event=>{
  console.log(event.target.files[0])
}

onChangeHandler5=event=>{
  this.setState({
  selectedFile5: event.target.files[0],
  loaded:0
})
}

  onClickHandler = () => {
    const data = new FormData() 
      data.append('file', this.state.selectedFile1)
      data.append('file', this.state.selectedFile2) 
      data.append('file', this.state.selectedFile3)
      data.append('file', this.state.selectedFile4)
      data.append('id',localStorage.getItem("id"))
    axios.post("http://localhost:3001/upload", data, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
      })
  },
        })
        .then(res => {
         // then print response status
          console.log(res.statusText)
          alert(JSON.stringify(res.data))
       })
      }

      onClickHandler1 = () => {

        const dp = new FormData()
        dp.append('file', this.state.selectedFile5)
        dp.append('id',localStorage.getItem("id"))
        axios.post("http://localhost:3001/dp", dp, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
      })
  },
        })
        .then(res => {
         // then print response status
          console.log(res.statusText)
          alert(JSON.stringify(res.data))
       })

      }

      render() {
        return (
         <React.Fragment>
    
         <Typography variant="h6" gutterBottom>
           Upload Documents (Only JPEG format )
         </Typography>
         <div className="container h-100 d-flex justify-content-center">
          <Grid container spacing={5}>
           <Grid item xs={12} sm={0}>
                <b><label>Upload any Government ID :</label></b> {"\n"}
                <input type="file"  onChange={this.onChangeHandler1} style={{width: "250px"}}/>
          <div class="form-group">
                <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
          </div>
           </Grid>

           <Grid item xs={12} sm={0}>
                <b><label>Upload Divorced Certificate (If Applicable) :</label></b> {"\n"}
                <input type="file"  onChange={this.onChangeHandler2} style={{width: "220px"}}/>
          <div class="form-group">
                <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
          </div>
           </Grid>

           <Grid item xs={12} sm={0}>
                <b><label>Upload Ex-Partners Death Certificate (If Applicable) :</label></b>{"\n"}
                <input type="file"  onChange={this.onChangeHandler3} style={{width: "160px"}}/>
          <div class="form-group">
                <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
          </div>
           </Grid>

           <Grid item xs={12} sm={0}>
                <b><label>Upload Other Required Document(If Applicable) :</label></b> {"\n"}
                <input type="file"  onChange={this.onChangeHandler4} style={{width: "160px"}}/>
          <div class="form-group">
                <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
          </div>
           </Grid>
           <Grid item xs={12} sm={0}>
                <b><label>Upload Profile Picture:</label></b> {"\n"}
                <input type="file"  onChange={this.onChangeHandler5} style={{width: "160px"}}/>
          <div class="form-group">
          </div>
          <button type="button"  onClick={this.onClickHandler1}>Upload DP</button>
           </Grid>

           <Grid item xs={12} sm={0}>
                <button type="button"  onClick={this.onClickHandler}>Upload Documents</button>
           </Grid>

          </Grid>
        </div>

           </React.Fragment>
       );
       }

}
  
    // export default function UploadDocuments() {
      // render() {
      //  return (
        
      //   <React.Fragment>
   
      //   <Typography variant="h6" gutterBottom>
      //     Basic details
      //   </Typography>
      //    <div className="container h-100 d-flex justify-content-center">
      //   <Grid container spacing={3}>
      //     <Grid item xs={12} sm={6}>
      //     <label>Upload Your File </label>
      //             <input type="file"  onChange={this.onChangeHandler}/>
                
      //           <button type="button"  onClick={this.onClickHandler}>Upload</button>
      //     </Grid>
      //     </Grid>
      //     </div>
      //     </React.Fragment>
      // );
      // }
  // }
  


