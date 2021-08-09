import { Fragment } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 2),
    //     [theme.breakpoints.up("lg")]: {
    //       padding: 0,
    //     },
  },
}));

export default function Layout({ children, navbar }) {
  const classes = useStyles();
  return (
    <Fragment>
      <Container disableGutters={true}>{navbar}</Container>

      <Container
        classes={{
          root: classes.root,
        }}
      >
        {children}
      </Container>
    </Fragment>
  );
}
