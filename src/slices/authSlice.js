import { createSlice } from "@reduxjs/toolkit";

import { postDataAPI, getDataAPI } from "../utils/fetchApi";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => payload,
    changePhotoSuccess: (state, { payload }) => {
      state.user.avatar = payload;
    },
    changeCoverSuccess: (state, { payload }) => {
      state.user.cover = payload;
    },
    editSuccess: (state, { payload }) => {
      state.user.displayName = payload.displayName;
    },
  },
});

export const getCurrentUser = (setLoading) => async (dispatch) => {
  try {
    const { data } = await getDataAPI("/users/auth");
    dispatch(setCurrentUser({ isAuthenticated: true, user: data }));
  } catch (error) {}
  setLoading(false);
};

export const register =
  (values, { setError, toLoginPage, enqueueSnackbar }) =>
  async () => {
    try {
      await postDataAPI("/users/register", values);
      toLoginPage();
      enqueueSnackbar("Register succeeded", {
        variant: "success",
      });
    } catch (error) {
      const data = error?.response?.data;
      if (data) {
        Object.keys(data).forEach((key) => {
          setError(key, { message: data[key] });
        });
      }
      enqueueSnackbar("Something wrong", {
        variant: "error",
      });
    }
  };

export const linkAccount =
  (values, userId, history, setError) => async (dispatch) => {
    try {
      const { data } = await postDataAPI(`/users/${userId}/verify`, values);
      dispatch(setCurrentUser({ isAuthenticated: true, user: data }));
      history.push("/");
    } catch (error) {
      const errorData = error?.response?.data;
      if (errorData) {
        setError("password", errorData);
      }
    }
  };

export const login =
  (values, { setError, goBackPreviousPage, enqueueSnackbar }) =>
  async (dispatch) => {
    try {
      const { data } = await postDataAPI("/users/login", values);
      dispatch(setCurrentUser({ isAuthenticated: true, user: data }));
      goBackPreviousPage();
      enqueueSnackbar("Login succeeded", {
        variant: "success",
      });
    } catch (error) {
      const errorData = error?.response?.data;
      if (errorData) {
        Object.keys(errorData).forEach((key) => {
          setError(key, { message: errorData[key] });
        });
      }
      enqueueSnackbar("Something wrong", {
        variant: "error",
      });
    }
  };

export const logout = (history, enqueueSnackbar) => async (dispatch) => {
  try {
    await getDataAPI("/users/logout");
    dispatch(setCurrentUser({ isAuthenticated: false, user: null }));
    enqueueSnackbar("Logout succeeded", {
      variant: "success",
    });
  } catch (error) {
    enqueueSnackbar("Something wrong", {
      variant: "error",
    });
  }
  //   history.push("/");
};

const { reducer, actions } = auth;
export const {
  setCurrentUser,
  changePhotoSuccess,
  changeCoverSuccess,
  editSuccess,
} = actions;

export default reducer;
