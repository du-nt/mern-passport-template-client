import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#1976d2",
      dark: "#303f9f",
    },
    secondary: {
      main: "#dc004e",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
    drawer: {
      default: "#fff",
    },
    paper: {
      main: "#fff",
      text: "#000",
      divider: "rgba(0, 0, 0, 0.12)",
    },
    avatar: {
      main: "#fff",
      background: "#212121",
    },
    icon: {
      main: "#1976d2",
    },
    textfield: {
      main: "#1976d2",
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#282a36",
      dark: "#aeb7ef",
    },
    secondary: {
      main: "#ff79aa",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#44475a",
    },
    drawer: {
      default: "#282a36",
    },
    paper: {
      main: "#484a54",
      text: "#fff",
      divider: "rgba(255, 255, 255, 0.12)",
    },
    avatar: {
      main: "#282a36",
      background: "#fff",
    },
    icon: {
      main: "#fff",
    },
    textfield: {
      main: "#c7c7c7",
    },
  },
});
