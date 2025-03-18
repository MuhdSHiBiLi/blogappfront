import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const tokencancel = ()=>{
    sessionStorage.removeItem('userToken')
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ backgroundColor: "purple" }} position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BlogApp
            </Typography>
            <Button color="inherit">
              <Link
                to={"/blogs"}
                style={{ textDecoration: "none", color: "white" }}
              >
                Blogs
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                to={"/add"}
                style={{ textDecoration: "none", color: "white" }}
              >
                AddBlog
              </Link>
            </Button>
            <Button color="inherit" onClick={tokencancel}>
              <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
                Logout or GoBack
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
