import React from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Paper, Typography } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import mapStyles from "../../mapStyles";
import useStyles from "./styles";

const Map = ({
  weatherData,

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

  const props = {
    getMapOptions: {
      styles: mapStyles,
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false,
      mapTypeControl: true,
      streetViewControl: true,
    },
  };

  return (
    <>
      <div className={classes.mapContainer}>
        <GoogleMapReact
          // public index有+scirpt的api key的話,這邊+不+都行
          // bootstrapURLKeys={{ key: "AIzaSyDl-G7XSeUwsdHeiGTp0vPWX-0R5hhb0SU" }}
          bootstrapURLKeys={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          defaultZoom={17}
          defaultCenter={coordinates}
          center={coordinates}
          margin={[50, 50, 50, 50]}
          onChange={onChange}
          options={props.getMapOptions}
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

          {weatherData?.list?.length &&
            weatherData.list.map((data, i) => (
              <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                <img
                  src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                  height="70px"
                  alt=""
                />
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
