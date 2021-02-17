import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import AppContent from "./AppContent";
import { ThemeProvider } from "styled-components";
import theme from "./misc/theme";
import GlobalStyles from "./GlobalStyles";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <AppContent />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
