import firebase from 'firebase/app'
import 'firebase/analytics'
import { SearchEvent } from '../analytics/events'

export async function logEvent(event: SearchEvent) {
  firebase.analytics().logEvent<typeof event.id>(event.id, event.payload)
}
