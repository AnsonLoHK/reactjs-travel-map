import "./App.css";
import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData } from "./api";

// 元件
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // getPlacesData();
    getPlacesData().then((data) => {
      console.log("getPlacesData", data);
      // setPosts(data);
    });
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={4}>
          <Map />
        </Grid>
      </Grid>
      <div>{posts}</div>
    </>
  );
}

export default App;
