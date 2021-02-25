import React from "react"
import { Provider } from "react-redux"
import { HashRouter, Route, Switch } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { ThemeProvider } from "styled-components"
import CookieConfirmation from "./components/features/CookieConfirmation"
import GlobalStyles from "./GlobalStyles"
import theme from "./misc/theme"
import Help from "./components/pages/Help"
import Search from "./components/pages/Search"
import Settings from "./components/pages/Settings"
import { persistor, store } from "./redux/store"
import { RouteName } from "./data/types"

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <HashRouter>
            <Switch>
              <Route path={RouteName.HELP}>
                <Help />
              </Route>
              <Route path={RouteName.SETTINGS}>
                <Settings />
              </Route>
              <Route path={RouteName.SEARCH}>
                <Search />
              </Route>
            </Switch>
            <CookieConfirmation />
          </HashRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
