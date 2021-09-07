import firebase from 'firebase/app'
import 'firebase/analytics'
import { SearchEvent } from '../analytics/events'

let initialized = false

export function init() {
  initialized = true
}

export async function logEvent(event: SearchEvent) {
  if (initialized) {
    firebase.analytics().logEvent<typeof event.id>(event.id, event.payload)
  }
}
