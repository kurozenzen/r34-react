import { MiddlewareAPI } from 'redux'
import { Dispatch } from 'react'
import {
  AppAction,
  FETCH_PREFERENCES,
  savePreferences,
  SAVE_PREFERENCES,
  setPreferences,
  SET_PREFERENCE,
} from '../actions'
import * as firebaseFunctions from '../../firebase'

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
    const preferences = await firebaseFunctions.getPreferences()

    if (preferences) {
      store.dispatch(setPreferences(preferences))
    }
  }

  if (action.type === SAVE_PREFERENCES) {
    const { preferences } = store.getState()
    firebaseFunctions.setPreferences(preferences)
  }

  next(action)
}

export default persistence
