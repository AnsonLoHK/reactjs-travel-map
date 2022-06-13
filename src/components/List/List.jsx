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
const List = ({ childClicked, places }) => {
  const classes = useStyles();
  const [type, setType] = useState("restaurant");
  const [rating, setRating] = useState("");
  const [elRefs, setElRefs] = useState([]);

  const refs = useRef();
  refs.current = [];
  console.log("refs", refs);

  // 0613範例
  const addToRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  // 0614 開始處理
  useEffect(() => {
    setElRefs((elRefs) =>
      Array(places.length)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [places]);

  let filledArray = new Array(10).fill(null).map(() => ({ hello: "goodbye" }));
  console.log("filledArray", filledArray);
  return (
    <div className={classes.container}>
      {/* 可刪 */}
      {Array(places.length)
        .fill()
        .map((el, i) => (
          <div ref={elRefs[i]} key={i}>
            {el}
          </div>
        ))}
      {/* 範例 0613 */}
      {Array(arrLength)
        .fill()
        .map((el, i) => (
          <div ref={addToRefs} key={i}>
            {i}
          </div>
        ))}
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
        {places?.map((place, i) => (
          <Grid key={i} item xs={12}>
            {/* <Paper className={classes.paper} /> */}
            <PlaceDetails place={place} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default List;
