import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PreferenceKey } from "../data/types"
import { setOption } from "../redux/actions"
import { PreferencesState } from "../redux/reducers/preferences"
import { selectPreferences } from "../redux/selectors"

export default function usePreference<T extends PreferenceKey>(
  key: T
): [PreferencesState[T], (value: PreferencesState[T]) => void] {
  const dispatch = useDispatch()
  const preferences = useSelector(selectPreferences)
  const setPreference = useCallback((value: any) => dispatch(setOption(key, value)), [dispatch, key])

  return [preferences[key], setPreference]
}
