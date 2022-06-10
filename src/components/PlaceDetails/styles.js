import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  chip: {
    margin: "5px 5px 5px 0",
  },

  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  subtitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  spacing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ranking: {
    color: theme.palette.primary.main,
  },
}));
