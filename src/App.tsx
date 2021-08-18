import React, { Suspense } from 'react'
import { Provider, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import ErrorBoundary from './components/features/ErrorBoundary'
import ErrorScreen from './components/pages/ErrorScreen'
import LoadingScreen from './components/pages/LoadingScreen'
import Terms from './components/pages/Terms'
import CellularWarningModal from './components/widgets/CellularWarningModal'
import CookieConfirmation from './components/widgets/CookieConfirmation'
import SupertagModal from './components/widgets/SupertagModal'
import { RouteName } from './data/types'
import './firebase' // init firebase immediately
import GlobalStyles from './GlobalStyles'
import { useLoadPreferences } from './hooks/useLoadPreferences'
import {
  selectActiveThemeId,
  selectCellularWarningModalOpen,
  selectCookies,
  selectSupertagModalOpen,
} from './redux/selectors'
import { persistor, store } from './redux/store'
import themes, { defaultThemeId } from './styled/themes'

const About = React.lazy(() => import('./components/pages/About'))
const Privacy = React.lazy(() => import('./components/pages/Privacy'))
const Search = React.lazy(() => import('./components/pages/Search'))
const Settings = React.lazy(() => import('./components/pages/Settings'))
const Share = React.lazy(() => import('./components/pages/Share'))
const Stories = React.lazy(() => import('./components/pages/Stories'))

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
  const cookies = useSelector(selectCookies)
  const isCellularWarningModalOpen = useSelector(selectCellularWarningModalOpen)
  const isSupertagModalOpen = useSelector(selectSupertagModalOpen)
  const themeId = useSelector(selectActiveThemeId)

  useLoadPreferences()

  return (
    <ThemeProvider theme={themes[themeId] || defaultThemeId}>
      <GlobalStyles />
      <BrowserRouter basename='/r34-react'>
        <Suspense fallback={<LoadingScreen />}>
          <Switch>
            <Route exact path={RouteName.ABOUT} component={About} />
            <Route exact path={RouteName.PRIVACY} component={Privacy} />
            <Route exact path={RouteName.SETTINGS} component={Settings} />
            <Route exact path={RouteName.STORIES} component={Stories} />
            <Route exact path={RouteName.TERMS} component={Terms} />
            <Route exact path={RouteName.SHARE} component={Share} />
            <Route path={RouteName.SEARCH} component={Search} />
          </Switch>
        </Suspense>

        {isSupertagModalOpen && <SupertagModal />}
        {isCellularWarningModalOpen && <CellularWarningModal />}
        {!cookies && <CookieConfirmation />}
      </BrowserRouter>
    </ThemeProvider>
  )
}
