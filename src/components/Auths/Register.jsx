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

import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { register } from "../../slices/authSlice";

const defaultValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  displayName: Yup.string().max(25, "Display name must have max 25 characters"),
  email: Yup.string().email("Email not valid").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6")
    .max(30, "Password too long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not match")
    .required("Confirm password is required"),
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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyles();
  const helperTextClasses = helperTextStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || {
    from: { pathname: "/" },
  };

  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up("sm"));
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

  const onSubmit = (values) => {
    const toLoginPage = () => {
      reset();
      history.push({ pathname: "/login", state: { from } });
    };
    dispatch(register(values, { setError, toLoginPage, enqueueSnackbar }));
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
                Register
              </Typography>
            </Grid>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="displayName"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="displayName"
                    label="Display name"
                    margin="normal"
                    error={!!error}
                    helperText={error ? error.message : null}
                    FormHelperTextProps={{ classes: helperTextClasses }}
                  />
                )}
              />
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
              <Grid container spacing={match ? 3 : 0}>
                <Grid item xs={10} sm={5}>
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
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={10} sm={5}>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Confirm password"
                        margin="normal"
                        type={showPassword ? "text" : "password"}
                        autoComplete="confirmPassword"
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
              </Grid>

              <Button
                disabled={isSubmitting || !isValid}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
            </form>

            <Grid container justify="space-between">
              <Grid item>
                <Link component={NavLink} to="/" variant="body2">
                  Back to home
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={NavLink}
                  to={{
                    pathname: "/login",
                    state: { from },
                  }}
                  variant="body2"
                >
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
