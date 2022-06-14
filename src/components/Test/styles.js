import { makeStyles, createStyles } from "@material-ui/core/styles";

export default makeStyles(() =>
  createStyles({
    list: {
      height: "15vh",
      width: "400px",
      overflow: "auto",
    },
    listBackground: {
      backgroundColor: "yellow",
    },
  })
);
