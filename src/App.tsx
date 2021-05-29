import React, { Suspense, useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import ErrorBoundary from './components/features/ErrorBoundary'
import ErrorScreen from './components/pages/ErrorScreen'
import LoadingScreen from './components/pages/LoadingScreen'
import CookieConfirmation from './components/widgets/CookieConfirmation'
import { RouteName } from './data/types'
import GlobalStyles from './GlobalStyles'
import themes, { defaultThemeId } from './styled/themes'
import { selectActiveThemeId } from './redux/selectors'
import { persistor, store } from './redux/store'
import { fetchPreferences } from './redux/actions'

const Help = React.lazy(() => import('./components/pages/Help'))
const Settings = React.lazy(() => import('./components/pages/Settings'))
const Search = React.lazy(() => import('./components/pages/Search'))
const About = React.lazy(() => import('./components/pages/About'))

export default function App() {
  useEffect(() => {
    gapi.load('auth2', function () {
      gapi.auth2
        .init({
          client_id: '305691674169-siad1mgnmg2lhrctg2jaqusuv2kj1nd1.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/drive.appdata',
        })
        .then(() => {
          if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
            store.dispatch(fetchPreferences())
          }
        })
    })
  }, [])

  return (
    <ErrorBoundary fallback={<ErrorScreen />}>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <ThemedApp />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  )
}

function ThemedApp() {
  const themeId = useSelector(selectActiveThemeId)

  return (
    <ThemeProvider theme={themes[themeId] || defaultThemeId}>
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
    </ThemeProvider>
  )
}
