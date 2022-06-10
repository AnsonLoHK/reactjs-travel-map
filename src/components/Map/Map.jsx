import React from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Paper, Typography } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
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

  return (
    <>
      <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBOubLjCL-vfB8Zol4e8cdBzdvpNF_pGdI" }}
          defaultZoom={17}
          defaultCenter={coordinates}
          center={coordinates}
          margin={[50, 50, 50, 50]}
          onChange={onChange}
          onChildClick={onChildClick}
        >
          {places?.map(({ place, index }) => (
            <div
              key={index}
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
            >
              {!matches ? (
                // 電腦模式
                <LocationOnOutlinedIcon fontSize="large" color="secondary" />
              ) : (
                // 手機模式
                <Paper className={classes.paper} elevation={3}>
                  <Typography
                    // className={classes.typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {place.name}
                  </Typography>

                  <img
                    className={classes.pointer}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                  />
                </Paper>
              )}
            </div>
          ))}
        </GoogleMapReact>
        <Paper />
        <Typography />
      </div>
    </>
  );
};

Map.propTypes = {
  places: PropTypes.array,
};

export default Map;
