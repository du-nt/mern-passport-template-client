import { Fragment, useRef, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const CssTextField = withStyles((theme) => ({
  root: {
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.textfield.main,
    },
  },
}))(TextField);

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "flex-start",
  },
  paper: {
    margin: 0,
    borderRadius: 0,
    width: "100%",
  },
  toolbar: {
    padding: theme.spacing(0, 0.5),
  },
  form: {
    flex: 1,
    margin: theme.spacing(0, 1),
    position: "relative",
  },
  input: {
    width: "100%",
  },
  closeBtn: {
    color: theme.palette.primary.dark,
    fontSize: 18,
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translate(0,-50%)",
    cursor: "pointer",
  },
  padding: {
    paddingRight: theme.spacing(3),
  },
  color: {
    color: theme.palette.icon.main,
  },
  deleteIcon: {
    color: theme.palette.primary.dark,
  },
}));

export default function MobileSearch() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setSearch("");
    setOpen(false);
  };

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  const handleDelete = () => {
    inputRef.current.focus();
    setSearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  return (
    <Fragment>
      <IconButton color="inherit" onClick={handleOpen}>
        <SearchIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        classes={{
          container: classes.container,
          paper: classes.paper,
        }}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton className={classes.color} onClick={handleClose}>
            <ArrowBackIcon />
          </IconButton>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <CssTextField
              name="search"
              autoFocus
              autoComplete="off"
              placeholder="Search…"
              onChange={handleChange}
              value={search}
              inputRef={inputRef}
              className={classes.input}
              InputProps={{
                className: classes.padding,
              }}
            />

            {search && (
              <CloseIcon className={classes.closeBtn} onClick={handleDelete} />
            )}
          </form>

          <IconButton className={classes.color} onClick={handleSubmit}>
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </Dialog>
    </Fragment>
  );
}
