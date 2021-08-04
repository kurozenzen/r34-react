import { useCallback } from 'react'
import { PreferenceKey } from 'r34-types'
import { useDispatch, useSelector } from 'react-redux'
import { setPreference } from '../redux/actions'
import { PreferencesState } from '../redux/reducers/preferences'
import { selectPreferences } from '../redux/selectors'

/**
 * useState for preferences using redux instead of local state.
 */
export default function usePreference<T extends PreferenceKey>(
  key: T
): [PreferencesState[T], (value: PreferencesState[T]) => void] {
  const dispatch = useDispatch()
  const preferences = useSelector(selectPreferences)
  const setValue = useCallback((value: any) => dispatch(setPreference(key, value)), [dispatch, key])

  return [preferences[key], setValue]
}
