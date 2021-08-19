// Polyfills
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import React from 'react'
import ReactDOM from 'react-dom'
import 'whatwg-fetch'
import App from './App'
import { getVersionString } from './data/utils'
import * as serviceWorker from './serviceWorker'

Sentry.init({
  dsn: 'https://1a2933d829da41fe84d4dab5fcc520ae@o955708.ingest.sentry.io/5905045',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  release: getVersionString(),
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
      // fancy breadcrumbs are optional
    }
    return breadcrumb
  },
})

ReactDOM.render(<App />, document.getElementById('app-root'))

serviceWorker.register()
