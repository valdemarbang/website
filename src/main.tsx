import React from "react";
import ReactDOM from "react-dom/client";
import RoutesHandler from "./routes/routes.tsx";
import "./styles/main.css";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import OutfitFont from "./fonts/outfit/Outfit-Regular.ttf";
import InterFont from "./fonts/inter/Inter-Regular.ttf";

/**
 * Theme for the application because of using custom font
 */
const theme = createTheme({
  typography: {
    fontFamily: "Outfit, Inter, Arial",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Outfit';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url(${OutfitFont}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url(${InterFont}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

/**
 * Render the App component into the root element with the theme
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RoutesHandler />
    </ThemeProvider>
  </React.StrictMode>
);
