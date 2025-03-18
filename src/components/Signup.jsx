import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3005";


const Signup = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const inputHandler = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };



  const addHandler = async () => {
    try {
      // Make the API call (e.g., using Axios)
      const response = await axios.post(`${API_URL}/user`, users);

      // Handle successful response (if needed)
      console.log("Signup successful:", response.data.message);
      Swal.fire({
        title: "Good job!",
        text: `${response.data.message}`,
        icon: "success",
      });
      navigate('/')
    } catch (error) {
      // Handle error response
      if (error.response && error.response.status === 400) {
        // Display the custom error message sent from the server
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });

        console.error("Error during signup:", error.response.data.message); // Log to console
      } else {
        console.error("Internal server error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message} please try again later or contact the admin`,
        });
      }
    }
  };
  return (
    <div style={{ margin: "10%" }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            onChange={inputHandler}
          ></TextField>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            onChange={inputHandler}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Address"
            name="address"
            onChange={inputHandler}
          ></TextField>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <TextField
            fullWidth
            label="UserName"
            name="username"
            onChange={inputHandler}
          ></TextField>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            onChange={inputHandler}
          ></TextField>
        </Grid>
      </Grid>
      <br />
      <Button variant="contained" color="secondary" onClick={addHandler}>
        Signup
      </Button>
      <Grid item xs={6} sm={6} md={6}>
        <Typography>
          <Link to={"/"} style={{textDecoration:"none"}}>Back to login</Link>
        </Typography>
      </Grid>
    </div>
  );
};

export default Signup;
