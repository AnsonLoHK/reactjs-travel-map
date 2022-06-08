import React from "react";
import GoogleMapReact from "google-map-react";

import { Paper, Typography } from "@material-ui/core";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const Map = () => {
  const classes = useStyles();
  // const matches = useMediaQuery("(min-width:600px)");
  const coordinates = { lat: 0, lng: 0 };
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBHYJlzoMf9fPj6MIAlUYC3RnS8rmqHtkg" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
      ></GoogleMapReact>
      <Paper />
      <Typography />
    </div>
  );
};

export default Map;
