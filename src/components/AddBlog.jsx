import React, { useState, useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddBlog = ({ method, data }) => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    blogtitle: "",
    blogdiscription: "",
    blogimgurl: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (method === "put" && data) {
      setPost(data);
    }
  }, [data, method]);

  const inputHandler = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const addHandler = () => {
    if (!post.blogtitle || !post.blogdiscription || !post.blogimgurl) {
      setError("Please fill all the fields.");
      return;
    }

    if (method === "post") {
      axios.post("http://localhost:3005/user/add", post)
        .then((res) => {
          if (res.data.success) {
            Swal.fire({
              title: "Blog Added",
              text: `${res.data.success}`,
              icon: "success",
            });
            navigate("/blogs");
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.message} please try again later or contact the admin`,
          });
        });
    }

    if (method === "put") {
      axios.put("http://localhost:3005/user/update/" + post._id, post)
        .then((res) => {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${res.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload(false);
          }, 1750);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <div style={{ margin: "15% 20% 20% 20%" }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Blog Titel"
            name="blogtitle"
            value={post.blogtitle}
            onChange={inputHandler}
            error={error && !post.blogtitle}
            helperText={error && !post.blogtitle ? error : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Blog description"
            name="blogdiscription"
            value={post.blogdiscription}
            onChange={inputHandler}
            error={error && !post.blogdiscription}
            helperText={error && !post.blogdiscription ? error : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Blog image link"
            name="blogimgurl"
            value={post.blogimgurl}
            onChange={inputHandler}
            error={error && !post.blogimgurl}
            helperText={error && !post.blogimgurl ? error : ""}
          />
        </Grid>
      </Grid>
      <br />
      <Button variant="contained" color="secondary" onClick={addHandler}>
        {method === "post" ? "Add" : "Update"}
      </Button>
    </div>
  );
};

export default AddBlog;
