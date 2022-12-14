import React, { useState, useEffect, createRef } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./styles";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({
  setRating,
  rating,
  setType,
  type,
  isLoading,
  childClicked,
  places,
}) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);
  const [progress, setProgress] = useState(30);

  // 對每個place進行refs掛勾
  useEffect(() => {
    setElRefs((elRefs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [places]);

  // loading 載入快慢動畫顯示
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 30
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotel & Attractions around you
      </Typography>

      {isLoading ? (
        // 載入中
        <CircularProgressWithLabel value={progress} />
      ) : (
        <>
          <FormControl component="fieldset" className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <MenuItem value="restaurants">Restaurant</MenuItem>
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

          <Grid container spacing={3} className={classes.list}>
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
          </Grid>
        </>
      )}
    </div>
  );
};

// 有%數的進度條
function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default List;
