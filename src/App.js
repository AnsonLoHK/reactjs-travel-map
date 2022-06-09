import "./App.css";
import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData } from "./api";

// 元件
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     ({ coords: { latitude, longitude } }) => {
  //       setCoordinates({ lat: latitude, lng: longitude });
  //     }
  //   );
  // }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    console.log("coordinates, bounds", coordinates, bounds);
    bounds &&
      getPlacesData(bounds.sw, bounds.ne).then((data) => {
        console.log("getPlacesData", data);
        setPlaces(data);
      });
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
          />
        </Grid>
        {/* 自動偵測不同位置的經緯度 */}
        <Grid item xs={12} md={4}>
          <label>Latitude</label>
          <input
            type="number"
            id="lat"
            name="lat"
            value={coordinates.lat}
            onChange={(event) =>
              setCoordinates({
                ...coordinates,
                lat: Number(event.target.value),
              })
            }
          />
          <label>longitude</label>
          <input
            type="number"
            id="lng"
            name="lng"
            value={coordinates.lng}
            onChange={(event) =>
              setCoordinates({
                ...coordinates,
                lng: Number(event.target.value),
              })
            }
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
