import React, { Suspense } from "react"
import { Provider } from "react-redux"
import { HashRouter, Route, Switch } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { ThemeProvider } from "styled-components"
import CookieConfirmation from "./components/features/CookieConfirmation"
import GlobalStyles from "./GlobalStyles"
import theme from "./misc/theme"
import Search from "./components/pages/Search"
import { persistor, store } from "./redux/store"
import { RouteName } from "./data/types"

const Help = React.lazy(() => import("./components/pages/Help"))
const Settings = React.lazy(() => import("./components/pages/Settings"))

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <HashRouter>
            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
            <CookieConfirmation />
          </HashRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
