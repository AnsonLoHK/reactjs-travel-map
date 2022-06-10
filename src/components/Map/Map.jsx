import React from "react";
import GoogleMapReact from "google-map-react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Paper, Typography } from "@material-ui/core";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const Map = ({ places, setCoordinates, setBounds, coordinates }) => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");

  const onChange = (e) => {
    console.log("onChange", e);
    // 0608 座標在日本 (可能跟vpn位置有關)
    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
  };
  const onChildClick = (e) => {
    // console.log("onChildClick", e);
  };

  console.log("Map->places!", places);

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
        >
          {places?.map(({ place, index }) => (
            <>
              {!matches ? (
                // 電腦模式
                <div>電腦模式</div>
              ) : (
                // 手機模式
                <div>手機模式</div>
              )}
            </>
          ))}
        </GoogleMapReact>
        <Paper />
        <Typography />
      </div>
    </>
  );
};

export default Map;
