import { useState } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSnackbar } from "notistack";

import Google from "./SocialLoginButtons/Google";
import Facebook from "./SocialLoginButtons/Facebook";

import { login } from "../../slices/authSlice";

const defaultValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email not valid").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6")
    .max(30, "Password too long")
    .required("Password is required"),
});

const useStyles = makeStyles((theme) => ({
  paperstyle: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(8),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  inputAdornment: {
    marginLeft: -48,
  },
  showPassWordIcon: {
    position: "relative",
    left: 48,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const helperTextStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "100%",
    marginTop: 0,
  },
}));

export default function Login(props) {
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const classes = useStyles();
  const helperTextClasses = helperTextStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  const blurMatch = useMediaQuery(theme.breakpoints.up("md"));

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  console.log(props);
  const onSubmit = (data) => {
    //     setGoHomeIfLogged(false);
    const goBackPreviousPage = () => {
      reset();
      history.push(from);
    };
    dispatch(login(data, { setError, goBackPreviousPage, enqueueSnackbar }));
  };

  return (
    <Container disableGutters maxWidth="md">
      <Grid container justify="center" alignContent="center">
        <Grid item xs={12} sm={9} md={8}>
          <Paper elevation={blurMatch ? 3 : 0} className={classes.paperstyle}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
            </Grid>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    id="email"
                    label="Email address"
                    margin="normal"
                    autoComplete="email"
                    error={!!error}
                    helperText={error ? error.message : null}
                    FormHelperTextProps={{ classes: helperTextClasses }}
                  />
                )}
              />
              <Grid item xs={10}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      margin="normal"
                      type={showPassword ? "text" : "password"}
                      autoComplete="password"
                      error={!!error}
                      helperText={error ? error.message : null}
                      FormHelperTextProps={{ classes: helperTextClasses }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <IconButton
                              className={classes.showPassWordIcon}
                              onClick={handleClickShowPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              <Button
                disabled={isSubmitting || !isValid}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
            </form>

            <Google />
            <Facebook />

            <Grid container justify="space-between">
              <Grid item>
                <Link component={NavLink} to="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={NavLink}
                  to={{
                    pathname: "/register",
                    state: { from },
                  }}
                  variant="body2"
                >
                  Don't have an account? Register
                </Link>
              </Grid>
            </Grid>
            <Grid container justify="flex-start">
              <Link component={NavLink} to="/" variant="body2">
                Back to home
              </Link>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
