import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

import { lightTheme, darkTheme } from "./theme";
import { useDarkMode } from "./hooks";

import NotFound from "./components/NotFound";
import Loading from "./components/Navbar/Loading";

import { getCurrentUser } from "./slices/authSlice";

import {
  routes,
  GuardRoute,
  authRoutes,
  AuthRoute,
  adminRoutes,
  AdminRoute,
} from "./routes";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { isDark, toggle, componentMounted } = useDarkMode(false);
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    dispatch(getCurrentUser(setLoading));
  }, [dispatch]);

  if (!componentMounted) {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Switch>
          {routes.map((route, index) => (
            <GuardRoute
              key={index}
              isDark={isDark}
              toggle={toggle}
              {...route}
            />
          ))}

          {authRoutes.map((route, index) => (
            <AuthRoute key={index} {...route} />
          ))}

          {adminRoutes.map((route, index) => (
            <AdminRoute
              key={index}
              isDark={isDark}
              toggle={toggle}
              {...route}
            />
          ))}

          <Route component={NotFound} />
        </Switch>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
