import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import AppContent from "./AppContent";
import { createGlobalStyle, css, ThemeProvider } from "styled-components";
import theme from "./misc/theme";

const GlobalStyle = createGlobalStyle(
  (props) => css`
    * {
      box-sizing: border-box;
    }

    body {
      background-color: ${(props.theme as typeof theme).colors.backgroundColor};
    }
  `
);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AppContent />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
