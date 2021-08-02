import React, { useCallback } from 'react'
import { ThemeId, PreferenceKey } from '../../data/types'
import usePreference from '../../hooks/usePreference'
import Select from '../common/Select'
import Setting from '../common/Setting'

const themes = {
  [ThemeId.DARK]: 'Dark',
  [ThemeId.LIGHT]: 'Light',
  [ThemeId.COFFEE]: 'Coffee',
  [ThemeId.ELECTRIC]: 'Electric',
}

export default function PrefTheme() {
  const [themeId, setThemeId] = usePreference(PreferenceKey.THEME_ID)
  const changeTheme = useCallback((event) => setThemeId(event.target.value), [setThemeId])

  return (
    <Setting title='Theme' description='Choose how the app looks.'>
      <Select options={themes} value={themeId} onChange={changeTheme} />
    </Setting>
  )
}
