import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  xxx: {
    color: "red",
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <>
      <Box>
        <Typography variant="h4" component="h1" className={classes.xxx}>
          React
        </Typography>
        <Link component={NavLink} to="/register" variant="h5">
          go to register
        </Link>
        <Box>
          {[...new Array(57)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join("\n")}
        </Box>
      </Box>
    </>
  );
}
