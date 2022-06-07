import React, { useState } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import useStyles from "./styles";

const List = () => {
  const [type, setType] = useState("female");

  const classes = useStyles();

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotel & Attractions around you
      </Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={handleChange}>
          <MenuItem value="restaurant">Restaurant</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default List;
