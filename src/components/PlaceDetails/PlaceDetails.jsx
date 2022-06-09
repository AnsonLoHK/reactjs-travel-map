import React from "react";

import {
  Box,
  Typography,
  Card,
  Button,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
// import { PriceChange } from "@mui/icons-material";

import { useStyles } from "./styles";

const styles = {
  media: {
    height: 350,
  },
};

const PlaceDetails = ({ place }) => {
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
        {/* 標籤 */}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
