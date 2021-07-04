import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    // textTransform: "uppercase",
  },
  logo: {
    // borderRadius: "50%",
    height: 48,
    cursor: "pointer",
  },
}));

export default function Logo() {
  const classes = useStyles();
  const brandName = "";
  const logoUrl =
    "https://cdn.shortpixel.ai/client/q_glossy,ret_img/https://nezha.jp/wp-content/uploads/2021/02/nazha_LOGO_600x343.png";

  return brandName ? (
    <Link
      className={classes.logoWrapper}
      variant="h5"
      color="inherit"
      component={NavLink}
      to="/"
    >
      {brandName}
    </Link>
  ) : (
    <Link component={NavLink} to="/">
      <div className={classes.logoWrapper}>
        <img src={logoUrl} alt="logo" className={classes.logo} />
      </div>
    </Link>
  );
}
