import React, { useRef, useEffect } from "react";
import useStyles from "./styles";
import { Grid } from "@material-ui/core";
const Test = (props) => {
  const classes = useStyles();
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, props.items.length);
  }, [props.items]);

  return (
    <Grid className={classes.list}>
      <h1>SideProject更新公告</h1>
      {props.items.map((item, i) => (
        <p
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
          style={{
            width: `${(i + 1) * 300}px`,
            border: "1px solid rgba(0, 0, 0, 0.05)",
          }}
          className={classes.listBackground}
        >
          {i + 1}.{item}
        </p>
      ))}
    </Grid>
  );
};

export default Test;
