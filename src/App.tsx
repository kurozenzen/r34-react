import React, { Suspense } from 'react'
import { Helmet } from 'react-helmet'
import { Provider, useSelector } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import ErrorBoundary from './components/features/ErrorBoundary'
import GlobalKeybindings from './components/features/GlobalKeybindings'
import ErrorScreen from './components/pages/ErrorScreen'
import LoadingScreen from './components/pages/LoadingScreen'
import Terms from './components/pages/Terms'
import CellularWarningModal from './components/widgets/CellularWarningModal'
import CookieConfirmation from './components/widgets/CookieConfirmation'
import SupertagModal from './components/widgets/SupertagModal'
import { RouteName } from './data/types'
import './client/firebase' // init firebase immediately
import GlobalStyles from './GlobalStyles'
import { useLoadPreferences } from './hooks/useLoadPreferences'
import {
  selectActiveThemeId,
  selectCellularWarningModalOpen,
  selectCookies,
  selectSupertagModalOpen,
} from './redux/selectors'
import { persistor, store } from './redux/store'
import { themes, defaultThemeId } from 'r34-branding'

const About = React.lazy(() => import('./components/pages/About'))
const Privacy = React.lazy(() => import('./components/pages/Privacy'))
const Search = React.lazy(() => import('./components/pages/Search'))
const Preferences = React.lazy(() => import('./components/pages/Preferences'))
const Share = React.lazy(() => import('./components/pages/Share'))
const Stories = React.lazy(() => import('./components/pages/Stories'))

const loadingScreen = <LoadingScreen />

export default function App() {
  return (
    <ErrorBoundary fallback={<ErrorScreen />}>
      <Provider store={store}>
        <PersistGate loading={loadingScreen} persistor={persistor}>
          <ThemedApp />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  )
}

function ThemedApp() {
  const cookies = useSelector(selectCookies)
  const isCellularWarningModalOpen = useSelector(selectCellularWarningModalOpen)
  const isSupertagModalOpen = useSelector(selectSupertagModalOpen)
  const themeId = useSelector(selectActiveThemeId)
  const theme = themes[themeId] || defaultThemeId

  useLoadPreferences()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GlobalKeybindings />
      <Helmet>
        <meta name='theme-color' content={theme.colors.layerBgSolid} />
      </Helmet>
      <HashRouter>
        <Suspense fallback={loadingScreen}>
          <Switch>
            <Route exact path={RouteName.ABOUT} component={About} />
            <Route exact path={RouteName.PRIVACY} component={Privacy} />
            <Route exact path={RouteName.PREFERENCES} component={Preferences} />
            <Route exact path={RouteName.STORIES} component={Stories} />
            <Route exact path={RouteName.TERMS} component={Terms} />
            <Route exact path={RouteName.SHARE} component={Share} />
            <Route path={RouteName.SEARCH} component={Search} />
          </Switch>
        </Suspense>

        {isSupertagModalOpen && <SupertagModal />}
        {isCellularWarningModalOpen && <CellularWarningModal />}
        {!cookies && <CookieConfirmation />}
      </HashRouter>
    </ThemeProvider>
  )
}
