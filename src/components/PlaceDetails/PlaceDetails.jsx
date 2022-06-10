import React from "react";

import {
  Box,
  Typography,
  Card,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  IconButton,
} from "@material-ui/core";
// import { PriceChange } from "@mui/icons-material";

import TagFacesIcon from "@material-ui/icons/TagFaces";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";

import { useStyles } from "./styles";

const styles = {
  media: {
    height: 350,
  },
};

const PlaceDetails = ({ place }) => {
  console.log("個別place", place);
  const classes = useStyles();
  return (
    <Card elevation={6}>
      <CardMedia
        style={styles.media} // specify styles
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        } // require image
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box
          className={classes.ranking}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
        {/* 歷年得獎區 */}
        {place?.awards?.map((award) => (
          <Box my={1} display="flex" justifyContent="space-between">
            <img src={award.images.small} alt={award.display_name} />
            <Typography color="textSecondary" variant="subtitle2">
              {award.display_name}
            </Typography>
          </Box>
        ))}

        {/* 佳餚區tags */}
        {place?.cuisine?.map(({ name, key }) => {
          let icon;

          if (name === "Chinese") {
            icon = <TagFacesIcon />;
          }

          return (
            <li key={key}>
              <Chip icon={icon} label={name} />
            </li>
          );
        })}

        {/* 地址 */}
        {place?.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <IconButton
              color="primary"
              aria-label="位置"
              size="small"
              onClick={() => {
                console.log("onClick");
              }}
            >
              <LocationOnIcon />
            </IconButton>

            {place.address}
          </Typography>
        )}

        {/* 電話 */}
        {place?.phone && (
          <Typography
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <IconButton
              variant="subtitle2"
              color="secondary"
              aria-label="電話"
              size="small"
              onClick={() => {
                // console.log("撥通電話");
              }}
            >
              <LocalPhoneIcon />
            </IconButton>
            {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              console.log("onClick");
            }}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              console.log("onClick");
            }}
          >
            website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
