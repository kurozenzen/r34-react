import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import CookieConfirmation from './components/widgets/CookieConfirmation'
import GlobalStyles from './GlobalStyles'
import theme from './misc/theme'
import { persistor, store } from './redux/store'
import { RouteName } from './data/types'
import LoadingScreen from './components/pages/LoadingScreen'
import AppCrashHandler from './components/features/AppCrashHandler'
import ErrorScreen from './components/pages/ErrorScreen'

const Help = React.lazy(() => import('./components/pages/Help'))
const Settings = React.lazy(() => import('./components/pages/Settings'))
const Search = React.lazy(() => import('./components/pages/Search'))

export default function App() {
  return (
    <AppCrashHandler fallback={<ErrorScreen />}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={<LoadingScreen />} persistor={persistor}>
            <GlobalStyles />
            <HashRouter>
              <Suspense fallback={<LoadingScreen />}>
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
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </AppCrashHandler>
  )
}
