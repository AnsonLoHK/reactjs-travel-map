import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { getPlacesData } from "./api";

// 元件
import Header from "./components/Header/Header";
import List from "./components/List/List";
// 測試
import Test from "./components/Test/Test";
import { Map } from "./components/Map/Map";
import useStyles from "./styles";

const useMountEffect = (fun) => useEffect(fun, []);

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const matches = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

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
      <div>123</div>
      <Header myRef={myRef} />
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
      {/* 公告欄位(可刪) */}
      {matches ? (
        <Grid item xs={12} gutterBottom>
          <Paper>
            <Typography
              // className={classes.typography}
              variant="subtitle2"
              gutterBottom
            >
              手機模式下不顯示公告欄位,請將網頁放大
            </Typography>
          </Paper>
        </Grid>
      ) : (
        <Paper elevation={3} className={classes.paper}>
          <Test items={announcements} />
        </Paper>
      )}

      <button onClick={executeScroll}>回最上面</button>
    </>
  );
}

export default App;

// ---------實驗性功能區---------
const announcements = [
  "點選餐廳卡牌後自動跳往List區中的位置",
  "Rapid/Travel Advisor api串接list-in-boundary",
  "在地圖中桌面模式顯示餐廳資訊",
  "useMediaQuery偵測手機模式時呈現 LocationOnOutlinedIcon",
  "把公告欄位放在paper裡面",
];

// 另一種獲得coords的寫法
// useEffect(() => {
//   navigator.geolocation.getCurrentPosition(
//     ({ coords: { latitude, longitude } }) => {
//       setCoordinates({ lat: latitude, lng: longitude });
//     }
//   );
// }, []);
