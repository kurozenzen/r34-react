import React, { Suspense, useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
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
import { selectActiveThemeId, selectSupertagModalOpen } from './redux/selectors'
import { persistor, store } from './redux/store'
import Terms from './components/pages/Terms'
import useFirebaseAuthState from './hooks/useFirebaseAuthState'
import { closeModal, fetchPreferences } from './redux/actions'
import SupertagModal from './components/widgets/SupertagModal'

// init firebase immediately
import './firebase'
import useAction from './hooks/useAction'

const Settings = React.lazy(() => import('./components/pages/Settings'))
const Search = React.lazy(() => import('./components/pages/Search'))
const About = React.lazy(() => import('./components/pages/About'))
const Privacy = React.lazy(() => import('./components/pages/Privacy'))

export default function App() {
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
  const dispatch = useDispatch()
  const themeId = useSelector(selectActiveThemeId)
  const isSupertagModalOpen = useSelector(selectSupertagModalOpen)
  const [isSignedIn] = useFirebaseAuthState()
  const onCloseModals = useAction(closeModal)

  useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchPreferences())
    }
  }, [dispatch, isSignedIn])

  return (
    <ThemeProvider theme={themes[themeId] || defaultThemeId}>
      <GlobalStyles />
      <HashRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Switch>
            <Route exact path={RouteName.SETTINGS}>
              <Settings />
            </Route>
            <Route exact path={RouteName.ABOUT}>
              <About />
            </Route>
            <Route exact path={RouteName.PRIVACY}>
              <Privacy />
            </Route>
            <Route exact path={RouteName.TERMS}>
              <Terms />
            </Route>
            <Route path={RouteName.SEARCH}>
              <Search />
            </Route>
          </Switch>
        </Suspense>

        {isSupertagModalOpen && <SupertagModal onClose={onCloseModals} />}
        <CookieConfirmation />
      </HashRouter>
    </ThemeProvider>
  )
}
