import React, { useCallback } from 'react'
import usePreference from '../../hooks/usePreference'
import Setting from '../designsystem/Setting'
import Toggle from '../designsystem/Toggle'

export default function PrefLoadOriginals() {
  const [originals, setOriginals] = usePreference('originals')
  const toggleOriginals = useCallback(() => setOriginals(!originals), [originals, setOriginals])
  return (
    <Setting
      title='Load original sizes'
      description='Display images and videos at their original resolution. This will consume more data but provides a nicer experience.'
    >
      <Toggle value={originals} onToggle={toggleOriginals} />
    </Setting>
  )
}
