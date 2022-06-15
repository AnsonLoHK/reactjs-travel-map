import React from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Paper, Typography } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const Map = ({
  coordinatesTest,
  setChildClicked,
  places,
  setCoordinates,
  setBounds,
  coordinates,
}) => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");

  const onChange = (e) => {
    console.log("onChange", e);
    // 0608 座標在日本 (可能跟vpn位置有關)
    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
  };

  const _onChildClick = (childProps) => {
    setChildClicked(childProps);
  };

  return (
    <>
      <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDl-G7XSeUwsdHeiGTp0vPWX-0R5hhb0SU" }}
          defaultZoom={17}
          defaultCenter={coordinates}
          center={coordinatesTest.center}
          margin={[50, 50, 50, 50]}
          onChange={onChange}
          // onChildClick={(child) => setChildClicked(child)}
          onChildClick={_onChildClick}
        >
          {places?.length &&
            places.map((place, i) => (
              <div
                className={classes.markerContainer}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={i}
              >
                {!matches ? (
                  <LocationOnOutlinedIcon color="primary" fontSize="large" />
                ) : (
                  <Paper elevation={3} className={classes.paper}>
                    <Typography
                      className={classes.typography}
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
                      alt=""
                    />
                    <Rating
                      name="Rating Label"
                      value={Number(place.rating)}
                      size="small"
                      readOnly
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

export { Map };
