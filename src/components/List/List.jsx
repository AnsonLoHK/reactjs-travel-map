import React, { useState, useEffect, createRef, useRef } from "react";
import {
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./styles";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const arrLength = 5;
const useMountEffect = (fun) => useEffect(fun, []);
const List = ({ childClicked, places }) => {
  const classes = useStyles();
  const [type, setType] = useState("restaurant");
  const [rating, setRating] = useState("");
  const [elRefs, setElRefs] = useState([]);
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView(); // run this function from an event handler or pass it to useEffect to execute scroll
  useMountEffect(executeScroll); // Scroll on mount

  // 0614 開始處理
  useEffect(() => {
    setElRefs((elRefs) =>
      Array(places.length)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotel & Attractions around you
      </Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(event) => setType(event.target.value)}>
          <MenuItem value="restaurant">Restaurant</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select
          value={rating}
          onChange={(event) => setRating(event.target.value)}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2} className={classes.list}>
        <span ref={myRef}>起點</span>
        {places?.map((place, i) => (
          <Grid ref={elRefs[i]} key={i} item xs={12}>
            {/* <Paper className={classes.paper} /> */}
            <PlaceDetails
              place={place}
              selected={Number(childClicked) === i}
              refProp={elRefs[i]}
            />
          </Grid>
        ))}
        <button onClick={executeScroll}>置頂</button>
      </Grid>
    </div>
  );
};

export default List;
