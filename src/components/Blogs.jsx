import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import AddBlog from "./AddBlog";

const Blogs = () => {
  const [cardData, setCardData] = useState([]);
  const [up, setUp] = useState(false);
  const [singleVal, setSingleVal] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3005/user/view")
      .then((res) => {
        setCardData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const convertAndFormatDate = (utcTimestamp) => {
    const options = {
      timeZone: "Asia/Kolkata",
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    };
    const istDate = new Date(utcTimestamp).toLocaleString("en-IN", options);
    return istDate;
  };

  const deleteVal = (id) => {
    axios.delete("http://localhost:3005/user/delete/" + id).then((res) => {
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
    });
  };

  const updateVal = (val) => {
    setUp(true);
    setSingleVal(val);
  };

  const DeleteConfirmationModal = ({ blogTitle, id }) => {
    const handleDelete = () => {
      Swal.fire({
        title: "Are you sure?",
        text: `You are about to delete ${blogTitle}. This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteVal(id);
        }
      });
    };

    return (
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={handleDelete}
      >
        Delete
      </Button>
    );
  };

  let FinalJSX = (
    <div style={{ margin: "7%" }}>
      <Grid container spacing={2}>
        {cardData.map((val, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 400 }}>
              <CardMedia
                component="img"
                alt="...."
                height="200"
                image={val.blogimgurl}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {val.blogtitle}
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                  Last updated: {convertAndFormatDate(val.createAt)}
                  <br />
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {val.blogdiscription}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => updateVal(val)}
                >
                  Update
                </Button>
                <DeleteConfirmationModal
                  blogTitle={val.blogtitle}
                  id={val._id}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );

  if (up) FinalJSX = <AddBlog method="put" data={singleVal} />;

  return FinalJSX;
};

export default Blogs;

