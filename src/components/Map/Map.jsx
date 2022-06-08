import React from "react";
import GoogleMapReact from "google-map-react";

import { Paper, Typography } from "@material-ui/core";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const Map = ({ setCoordinates, setBounds, coordinates }) => {
  const classes = useStyles();
  // const matches = useMediaQuery("(min-width:600px)");

  const onChange = (e) => {
    console.log("onChange", e);
    // 0608 座標在日本 (可能跟vpn位置有關)
    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
  };
  const onChildClick = (e) => {
    console.log("onChildClick", e);
  };
  return (
    <>
      <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBOubLjCL-vfB8Zol4e8cdBzdvpNF_pGdI" }}
          defaultZoom={17}
          defaultCenter={coordinates}
          center={coordinates}
          margin={[50, 50, 50, 50]}
          options={""}
          onChange={onChange}
          onChildClick={onChildClick}
        ></GoogleMapReact>
        <Paper />
        <Typography />
      </div>
    </>
  );
};

export default Map;
