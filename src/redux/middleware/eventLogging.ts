import { ADD_TAG, AppAction, SET_POSTS, ADD_POSTS } from "../actions"
import firebase from "firebase/app"
import "firebase/analytics"
import { addTagEvent, searchEvent } from "../../analytics/events"
import { selectActiveTags, selectPreferences, selectPageNumber, selectCookies } from "../selectors"
import { MiddlewareAPI, Dispatch } from "redux"

const config = {
  apiKey: "AIzaSyBHdepwE7M4Byu2lFtX2s__9COcMdvXu7Q",
  authDomain: "r34-react.firebaseapp.com",
  databaseURL: "https://r34-react.firebaseio.com",
  projectId: "r34-react",
  storageBucket: "r34-react.appspot.com",
  messagingSenderId: "844749417844",
  appId: "1:844749417844:web:11fa1fda0e14f1ac2dd021",
  measurementId: "G-27J3QXZ8YR",
}

let firebaseApp: firebase.app.App
let analytics: firebase.analytics.Analytics

const eventLogging = (store: MiddlewareAPI<any>) => (next: Dispatch<AppAction>) => (action: AppAction) => {
  const cookies = selectCookies(store.getState())

  if (cookies) {
    if (!firebaseApp) {
      firebaseApp = firebase.initializeApp(config)
      analytics = firebaseApp.analytics()
    }

    if (action.type === ADD_TAG) {
      const { id, payload } = addTagEvent(action.tag)
      analytics.logEvent<typeof id>(id, payload)
    }

    if (action.type === ADD_POSTS || action.type === SET_POSTS) {
      const activeTags = selectActiveTags(store.getState())
      const pageNumber = selectPageNumber(store.getState())
      const preferences = selectPreferences(store.getState())
      const { id, payload } = searchEvent(activeTags, action.type === SET_POSTS ? 0 : pageNumber + 1, preferences)
      analytics.logEvent<typeof id>(id, payload)
    }
  }

  next(action)
}

export default eventLogging
