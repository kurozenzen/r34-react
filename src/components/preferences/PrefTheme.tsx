import React, { useCallback } from 'react'
import { Theme } from 'r34-types'
import usePreference from '../../hooks/usePreference'
import Select from '../common/Select'
import Setting from '../common/Setting'

const themes: Record<Theme, string> = {
  dark: 'Dark',
  light: 'Light',
  coffee: 'Coffee',
  electric: 'Electric',
  deepsea: 'Deep Sea',
}

export default function PrefTheme() {
  const [themeId, setThemeId] = usePreference('themeId')
  const changeTheme = useCallback((event) => setThemeId(event.target.value), [setThemeId])

  return (
    <Setting title='Theme' description='Choose how the app looks.'>
      <Select options={themes} value={themeId} onChange={changeTheme} />
    </Setting>
  )
}
