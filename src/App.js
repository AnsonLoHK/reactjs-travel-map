import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import { getPlacesData } from "./api";

// 元件
import Header from "./components/Header/Header";
import List from "./components/List/List";
import { Map } from "./components/Map/Map";

const useMountEffect = (fun) => useEffect(fun, []);

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const myRef = useRef(null);
  // 從最底部一瞬間跳為置頂位置
  const executeScroll = () => myRef.current.scrollIntoView(); // run this function from an event handler or pass it to useEffect to execute scroll
  useMountEffect(executeScroll); // Scroll on mount

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    bounds &&
      getPlacesData(bounds.sw, bounds.ne).then((data) => {
        // console.log("getPlacesData", data);
        setPlaces(data);
        // 拿到資料後便不繼續loading
        setIsLoading(false);
      });
  }, [coordinates, bounds]);

  return (
    <>
      {/* <CssBaseline /> */}
      <div ref={myRef}>123</div>
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        {/* 篩選區 */}
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            isLoading={isLoading}
          />
        </Grid>
        {/* 地圖區 */}
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
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
        {/* 自動偵測不同位置的經緯度 */}
        <Grid item xs={12} md={4}>
          <label>Latitude</label>
          <input
            type="number"
            id="lat"
            name="lat"
            value={coordinates}
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
            value={coordinates}
            onChange={(event) =>
              setCoordinates({
                ...coordinates,
                lng: Number(event.target.value),
              })
            }
          />
        </Grid>
      </Grid>
      <button onClick={executeScroll}>置頂</button>
    </>
  );
}

export default App;

// 另一種獲得coords的寫法
// useEffect(() => {
//   navigator.geolocation.getCurrentPosition(
//     ({ coords: { latitude, longitude } }) => {
//       setCoordinates({ lat: latitude, lng: longitude });
//     }
//   );
// }, []);
