import { ThemeProvider } from "@emotion/react";
import { StyledEngineProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import theme from "./customThemes";
import "./index.css";
import { persistor, store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={false} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <SnackbarProvider>
              <StyledEngineProvider injectFirst>
                <App />
              </StyledEngineProvider>
            </SnackbarProvider>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
