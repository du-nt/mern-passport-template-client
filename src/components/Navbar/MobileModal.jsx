import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, AppBar, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    padding: theme.spacing(0, 0.5),
  },
  iconBtn: {
    marginRight: theme.spacing(2),
  },
}));

export default function MobileModal({ open, handleClose, title }) {
  const classes = useStyles();

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              className={classes.iconBtn}
              onClick={handleClose}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">{title}</Typography>
          </Toolbar>
        </AppBar>
        <Grid container justify="center">
          <Typography>Your {title} here</Typography>
        </Grid>
      </Dialog>
    </div>
  );
}
