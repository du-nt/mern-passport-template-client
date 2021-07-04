import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: 1111,
    borderRadius: 4,
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.paper.main,
    borderRadius: 4,
  },
}));

export default function Popup({ children, open, anchorEl, handleClose }) {
  const classes = useStyles();

  return (
    <Popper
      className={classes.popper}
      open={open}
      anchorEl={anchorEl}
      placement="bottom-end"
      transition
      popperOptions={{ positionFixed: true }}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          timeout={300}
          style={{ transformOrigin: "right top" }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <div className={classes.paper}>{children}</div>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
