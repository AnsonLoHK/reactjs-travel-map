import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { getPlacesData } from "./api";

// 元件
import Header from "./components/Header/Header";
import List from "./components/List/List";
// 測試
// import Test from "./components/Test/Test";
import { Map } from "./components/Map/Map";
import useStyles from "./styles";

const useMountEffect = (fun) => useEffect(fun, []);

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  // 測試
  const [coordinatesTest, setCoordinatesTest] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filterPlaces, setFilterPlaces] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const [state, setState] = useState({});
  const matches = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  // 從最底部一瞬間跳為置頂位置
  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); // run this function from an event handler or pass it to useEffect to execute scroll
  useMountEffect(executeScroll); // Scroll on mount

  // ----------
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setCoordinates({ lat, lng });
    // var LatLng = place.geometry.location.toJSON();
    // const { lat, lng } = place.geometry.location;
  };

  // 過濾rating
  useEffect(() => {
    const filteredPlaces = places.filter((place) => {
      return place.rating > rating;
    });
    setFilterPlaces([...filteredPlaces]);
  }, [rating]);

  // 獲取 經緯度
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinatesTest({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        setCoordinates({ lat: latitude, lng: longitude });
      });
    }
    return () => {
      setCoordinatesTest({}); // This worked for me
      setCoordinates({});
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    bounds &&
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        // console.log("getPlacesData", data);
        setPlaces(data);
        // 拿到資料後便不繼續loading
        setIsLoading(false);
      });
  }, [type, coordinates, bounds]);

  return (
    <>
      <Header myRef={myRef} onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        {/* 篩選區 */}
        <Grid item xs={12} md={4}>
          <List
            places={filterPlaces.length ? filterPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
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
            // coordinatesTest 測試
            coordinatesTest={coordinatesTest}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filterPlaces.length ? filterPlaces : places}
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
          {/* 0615暫時先隱藏 */}
          {/* <Test items={announcements} /> */}
        </Paper>
      )}

      <button onClick={executeScroll}>回最上面</button>
    </>
  );
}

export default App;

// ---------實驗性功能區---------
// const announcements = [
//   "點選餐廳卡牌後自動跳往List區中的位置",
//   "Rapid/Travel Advisor api串接list-in-boundary",
//   "在地圖中桌面模式顯示餐廳資訊",
//   "useMediaQuery偵測手機模式時呈現 LocationOnOutlinedIcon",
//   "把公告欄位放在paper裡面",
// ];

// 另一種獲得coords的寫法
// useEffect(() => {
//   navigator.geolocation.getCurrentPosition(
//     ({ coords: { latitude, longitude } }) => {
//       setCoordinates({ lat: latitude, lng: longitude });
//     }
//   );
// }, []);

// 獲取經緯度
// useEffect(() => {
//   navigator.geolocation.getCurrentPosition((position) => {
//     var latitude = position.coords.latitude;
//     var longitude = position.coords.longitude;
//     setCoordinates({ lat: latitude, lng: longitude });
//   });
// }, []);
