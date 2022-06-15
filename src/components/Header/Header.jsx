import React from "react";
import useStyles from "./styles.js";
import { Autocomplete } from "@react-google-maps/api";

// icons
import SearchIcon from "@material-ui/icons/Search";
// component api
import { AppBar, Toolbar, Typography, Box, InputBase } from "@material-ui/core";

const google = (window.google = window.google ? window.google : {});
console.log("google", google);

const Header = ({ onPlaceChanged, onLoad, myRef }) => {
  const classes = useStyles();

  return (
    <div ref={myRef}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            旅行地圖
          </Typography>
          <Box display="flex">
            <Typography variant="h6" className={classes.title}>
              Explore new places
            </Typography>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </Autocomplete>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
