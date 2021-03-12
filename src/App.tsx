import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import ErrorBoundary from './components/features/ErrorBoundary'
import ErrorScreen from './components/pages/ErrorScreen'
import LoadingScreen from './components/pages/LoadingScreen'
import CookieConfirmation from './components/widgets/CookieConfirmation'
import { RouteName } from './data/types'
import GlobalStyles from './GlobalStyles'
import theme from './misc/theme'
import { persistor, store } from './redux/store'

const Help = React.lazy(() => import('./components/pages/Help'))
const Settings = React.lazy(() => import('./components/pages/Settings'))
const Search = React.lazy(() => import('./components/pages/Search'))
const About = React.lazy(() => import('./components/pages/About'))

export default function App() {
  return (
    <ErrorBoundary fallback={<ErrorScreen />}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={<LoadingScreen />} persistor={persistor}>
            <GlobalStyles />
            <HashRouter>
              <Suspense fallback={<LoadingScreen />}>
                <Switch>
                  <Route exact path={RouteName.HELP}>
                    <Help />
                  </Route>
                  <Route exact path={RouteName.SETTINGS}>
                    <Settings />
                  </Route>
                  <Route exact path={RouteName.ABOUT}>
                    <About />
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
    </ErrorBoundary>
  )
}
