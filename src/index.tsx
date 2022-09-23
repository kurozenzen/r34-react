// Polyfills
import 'whatwg-fetch'

import * as Sentry from '@sentry/react'
import { Offline } from '@sentry/integrations'
import ReactDOM from 'react-dom'
import App from './App'
import { getVersionString } from './data/utils'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

Sentry.init({
  dsn: 'https://1a2933d829da41fe84d4dab5fcc520ae@o955708.ingest.sentry.io/5905045',
  integrations: [new Offline()],
  tracesSampleRate: 1.0,
  release: getVersionString(),
  allowUrls: [/https:\/\/kurozenzen\.github\.io(.*)/, /https:\/\/r34-json\.herokuapp\.com(.*)/],
  ignoreErrors: [
    // Random plugins/extensions
    'top.GLOBALS',
    // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
    'originalCreateNotification',
    'canvas.contentDocument',
    'MyApp_RemoveAllHighlights',
    'http://tt.epicplay.com',
    "Can't find variable: ZiteReader",
    'jigsaw is not defined',
    'ComboSearch is not defined',
    'http://loading.retry.widdit.com/',
    'atomicFindClose',
  ],
  denyUrls: [
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
  ],
  beforeBreadcrumb(breadcrumb, hint) {
    try {
      if (breadcrumb?.category?.startsWith('ui')) {
        const target = hint?.event.target as HTMLElement
        const tag = target.tagName.toLowerCase()
        if (target.innerText) {
          breadcrumb.message = `${tag}: ${target.innerText}`
        } else if (target.id) {
          breadcrumb.message = `${tag}: ${target.id}`
        } else if (target.getAttribute('name')) {
          breadcrumb.message = `${tag}: ${target.getAttribute('name')}`
        } else if (target.title) {
          breadcrumb.message = `${tag}: ${target.title}`
        } else if (target.getAttribute('aria-label')) {
          breadcrumb.message = `${tag}: ${target.getAttribute('aria-label')}`
        } else if (target.getAttribute('data-name')) {
          breadcrumb.message = `${tag}: ${target.getAttribute('data-name')}`
        }
      }
    } catch (err) {
      // fancy breadcrumbs are optional. So no error handling required.
    }
    return breadcrumb
  },
})

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
  document.getElementById('app-root')
)

serviceWorkerRegistration.register()
