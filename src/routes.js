import { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar";
import Layout from "./components/Layout";

import Home from "./components/Home";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import Notification from "./components/Notification";
import Message from "./components/Message";

import Register from "./components/Auths/Register";
import Login from "./components/Auths/Login";
import ForgotPassword from "./components/Auths/ForgotPassword";

import Admin from "./components/Admin";

export const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Home />,
  },
  {
    path: "/profile",
    protect: true,
    component: () => <Profile />,
  },
  {
    path: "/cart",
    component: () => <Cart />,
  },
  {
    path: "/notifications",
    protect: true,
    component: () => <Notification />,
  },
  {
    path: "/messages",
    protect: true,
    component: () => <Message />,
  },
];

export const authRoutes = [
  {
    path: "/register",
    exact: true,
    component: () => <Register />,
  },
  {
    path: "/login",
    exact: true,
    component: () => <Login />,
  },
  {
    path: "/forgotpassword",
    exact: true,
    component: () => <ForgotPassword />,
  },
];

export const adminRoutes = [
  {
    path: "/admin",
    exact: true,
    component: () => <Admin />,
  },
];

export const GuardRoute = ({
  component: Component,
  protect = false,
  hasNavBar = true,
  isDark,
  toggle,
  ...rest
}) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        protect ? (
          isAuthenticated ? (
            hasNavBar ? (
              <Layout
                navbar={<Navbar {...props} isDark={isDark} toggle={toggle} />}
              >
                <Component {...props} />
              </Layout>
            ) : (
              <Component {...props} />
            )
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
        ) : hasNavBar ? (
          <Layout
            navbar={<Navbar {...props} isDark={isDark} toggle={toggle} />}
          >
            <Component {...props} />
          </Layout>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export const AuthRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [goHomeIfLogged, setGoHomeIfLogged] = useState(true);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && goHomeIfLogged ? (
          <Redirect to="/" />
        ) : (
          <Component
            {...props}
            bar="foo"
            setGoHomeIfLogged={setGoHomeIfLogged}
          />
        )
      }
    />
  );
};

export const AdminRoute = ({
  component: Component,
  hasNavBar = true,
  isDark,
  toggle,
  ...rest
}) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && user.isAdmin ? (
          hasNavBar ? (
            <Layout
              navbar={<Navbar {...props} isDark={isDark} toggle={toggle} />}
            >
              <Component {...props} />
            </Layout>
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
