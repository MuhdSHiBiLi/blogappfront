import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3005";


const Login = () => {
  const navigate = useNavigate();
  const [user,setUser]=useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const inputHandler =(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  const login= ()=>{
    if (!user.username || !user.password) {
      setError("Please fill in both username and password fields.");
      return;
    }
    console.log(user);
    axios.post(`${API_URL}/user/login`, user).then((res)=>{
      console.log(res.data.message)
      if(res.data.message == "Login Succesfull"){
        Swal.fire({
          title: "Good job!",
          text: `${res.data.message}`,
          icon: "success",
        });
        console.log(res.data.token);
        sessionStorage.setItem('userToken',res.data.token)
        navigate('/blogs')
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res.data.message}`,
        });
      }
    }).catch((err)=>{
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.message} please try again later or contact the admin`,
      });
    })
  }
  return (
    <div>
       <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      style={{margin:"10% 20% 30% 40%"}}>
      <Typography variant='h4' style={{color:"blue" }}>Blog app login</Typography>
    <div>
         <TextField
          id="filled-required"
          label="UserName"
          variant="outlined"
          name="username"
          onChange={inputHandler}
          error={error && !user.username}
          helperText={error && !user.username ? error : ""}
        />
         </div>
         <div>
        <TextField
          id="filled-disabled"
          label="Password"
          variant="filled"
          type='password'
          name="password"
          onChange={inputHandler}
          error={error && !user.password}
          helperText={error && !user.password ? error : ""}
        />
        
         </div>
         <Button variant="contained" color='secondary' style={{margin:"0% 2%"}}  onClick={login} >Login</Button>
         <Typography style={{padding:"60px", marginTop:"5%"}} variant='h9'><Link to={"/sign"} style={{textDecoration:"none"}} >Signup</Link></Typography>
    </Box>
    
    </div>
  )
}

export default Login
