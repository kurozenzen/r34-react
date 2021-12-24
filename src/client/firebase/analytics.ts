import firebase from "firebase/app"
import "firebase/analytics"

enum AnalyticsEventId {
  SEARCH = "r34_search",
}

export type SearchEvent = {
  id: AnalyticsEventId.SEARCH
  payload: {
    page_number: number
  }
}

/**
 * Should be called whenever a new search is started.
 */
export const searchEvent = (page_number: number): SearchEvent => ({
  id: AnalyticsEventId.SEARCH,
  payload: {
    page_number,
  },
})

let initialized = false

export function init() {
  initialized = true
}

export async function logEvent(event: SearchEvent) {
  if (initialized) {
    firebase.analytics().logEvent<typeof event.id>(event.id, event.payload)
  }
}
