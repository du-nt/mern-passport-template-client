import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1000000,
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cubes: {
    width: 60,
    height: 60,
  },
  cube: {
    width: "33%",
    height: "33%",
    backgroundColor: "#fff",
    float: "left",
    animation: `$cubeGridScaleDelay 1.3s infinite ease-in-out`,
  },
  cube1: {
    animationDelay: "0.2s",
  },
  cube2: {
    animationDelay: "0.3s",
  },
  cube3: {
    animationDelay: "0.4s",
  },
  cube4: {
    animationDelay: "0.1s",
  },
  cube5: {
    animationDelay: "0.2s",
  },
  cube6: {
    animationDelay: "0.3s",
  },
  cube7: {
    animationDelay: "0s",
  },
  cube8: {
    animationDelay: "0.1s",
  },
  cube9: {
    animationDelay: "0.2s",
  },
  "@keyframes cubeGridScaleDelay": {
    "0%": {},
    "70%": {},
    "100%": {
      transform: "scale3D(1, 1, 1)",
    },
    "35%": {
      transform: "scale3D(0, 0, 1)",
    },
  },
  "@-moz-keyframes cubeGridScaleDelay": {
    "0%": {},
    "70%": {},
    "100%": {
      transform: "scale3D(1, 1, 1)",
    },
    "35%": {
      transform: "scale3D(0, 0, 1)",
    },
  },
  "@-webkit-keyframes cubeGridScaleDelay": {
    "0%": {},
    "70%": {},
    "100%": {
      transform: "scale3D(1, 1, 1)",
    },
    "35%": {
      transform: "scale3D(0, 0, 1)",
    },
  },
}));

export default function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.cubes}>
        <div className={clsx(classes.cube, classes.cube1)}></div>
        <div className={clsx(classes.cube, classes.cube2)}></div>
        <div className={clsx(classes.cube, classes.cube3)}></div>
        <div className={clsx(classes.cube, classes.cube4)}></div>
        <div className={clsx(classes.cube, classes.cube5)}></div>
        <div className={clsx(classes.cube, classes.cube6)}></div>
        <div className={clsx(classes.cube, classes.cube7)}></div>
        <div className={clsx(classes.cube, classes.cube8)}></div>
        <div className={clsx(classes.cube, classes.cube9)}></div>
      </div>
    </div>
  );
}
