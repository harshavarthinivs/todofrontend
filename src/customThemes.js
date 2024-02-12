import { createTheme, responsiveFontSizes } from "@mui/material";

const baseTheme = createTheme();

const customCreate = (baseCreate) => (property) => {
  const baseTransition = baseCreate(property);

  return `${baseTransition},transform 0.1s ease-out`;
};
let theme = createTheme({
  palette: {
    primary: {
      main: "#4D4FB2",
    },
    secondary: {
      main: "#B2B04D",
    },
    green: {
      main: "#00FF00",
    },
    yellow: {
      main: "#FFFF00",
    },
    red: {
      main: "#FF0000",
    },
    white: {
      main: "#FFFFFF",
    },
  },
  typography: {
    //fontFamily: "Fira code, Poppins, sans-serif"
    fontFamily: "Poppins, Roboto, sans-serif",
  },
  transitions: {
    ...baseTheme.transitions,
    create: customCreate(baseTheme.transitions.create),
  },
});

theme = responsiveFontSizes(theme);

export default theme;
