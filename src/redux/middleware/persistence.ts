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
import * as firebaseFunctions from '../../client/firebase'
import { initialPreferencesState } from '../reducers/preferences'

let saveTimeout: ReturnType<typeof setTimeout> | null = null

const persistence = (store: MiddlewareAPI) => (next: Dispatch<AppAction>) => async (action: AppAction) => {
  if (action.type === SET_PREFERENCE) {
    if (saveTimeout) {
      clearTimeout(saveTimeout)
      saveTimeout = null
    } else {
      saveTimeout = setTimeout(() => {
        store.dispatch(savePreferences())
        saveTimeout = null
      }, 10000)
    }
  }

  if (action.type === FETCH_PREFERENCES) {
    const preferences = await firebaseFunctions.getPreferences()

    if (preferences) {
      // fill gaps with default values to avoid invalid preferences
      const newPreferences = { ...initialPreferencesState, ...preferences }
      store.dispatch(setPreferences(newPreferences))
    }
  }

  if (action.type === SAVE_PREFERENCES) {
    const { preferences } = store.getState()
    firebaseFunctions.setPreferences(preferences)
  }

  next(action)
}

export default persistence
