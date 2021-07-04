import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  googleBtn: {
    height: 42,
    backgroundColor: "#4285f4",
    borderRadius: "4px",
    boxShadow: "0 3px 4px 0 rgba(0,0,0,.25)",
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  googleIconWrapper: {
    width: 40,
    height: 40,
    marginLeft: 1,
    borderRadius: "4px",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
  },
}));

export default function Facebook() {
  const classes = useStyles();
  const url = "http://localhost:5000/auth/facebook";

  return (
    <a href={url}>
      <div className={classes.googleBtn}>
        <div className={classes.googleIconWrapper}>
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="facebook"
          />
        </div>
        <Typography className={classes.btnText}>
          Continue with Facebook
        </Typography>
      </div>
    </a>
  );
}
