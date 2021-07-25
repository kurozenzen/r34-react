import { MiddlewareAPI } from 'redux'
import { Dispatch } from 'react'
import {
  AddPostsAction,
  ADD_POSTS,
  AppAction,
  FETCH_PREFERENCES,
  savePreferences,
  SAVE_PREFERENCES,
  SetPostsAction,
  setPreferences,
  SET_POSTS,
  SET_PREFERENCE,
} from '../actions'
import { PreferenceKey } from '../../data/types'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { sha256 } from '../../data/encryption'

const db = firebase.firestore()
const preferencesCollection = db.collection('preferences')
const seenPostsCollection = db.collection('seenPosts')

let saveTimeout: NodeJS.Timeout

const persistence = (store: MiddlewareAPI) => (next: Dispatch<AppAction>) => async (action: AppAction) => {
  if (action.type === SET_PREFERENCE) {
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    saveTimeout = setTimeout(() => {
      store.dispatch(savePreferences())
    }, 10000)
  }

  if (action.type === FETCH_PREFERENCES) {
    const { currentUser } = firebase.auth()
    const email = currentUser?.email

    if (email) {
      const key = await sha256(email)
      const userRef = preferencesCollection.doc(key)
      const preferences = await userRef.get()

      if (preferences.exists) {
        store.dispatch(setPreferences(preferences.data() as Record<PreferenceKey, any>))
      }
    }
  }

  if (action.type === SAVE_PREFERENCES) {
    const { currentUser } = firebase.auth()
    const email = currentUser?.email

    if (email) {
      const key = await sha256(email)
      const { preferences } = store.getState()

      preferencesCollection
        .doc(key)
        .set(preferences)
        .catch((error) => {
          console.error('Error saving preferences: ', error)
        })
    }
  }

  if ([ADD_POSTS, SET_POSTS].includes(action.type)) {
    const { preferences } = store.getState()
    const hideSeen = preferences.hideSeen

    if (hideSeen) {
      const { currentUser } = firebase.auth()
      const email = currentUser?.email

      if (email) {
        const key = await sha256(email)

        const userRef = seenPostsCollection.doc(key)
        const seenPosts = await userRef.get()

        if (!seenPosts.exists) {
          await seenPostsCollection.doc(key).set({})
        }

        const ids = (action as AddPostsAction | SetPostsAction).posts.reduce(
          (result, current) => ({ ...result, [current.id]: {} }),
          {}
        )

        seenPostsCollection.doc(key).update(ids)
      }
    }
  }

  next(action)
}

export default persistence
