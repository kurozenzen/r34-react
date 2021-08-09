import React, { useCallback } from 'react'
import usePreference from '../../hooks/usePreference'
import Setting from '../designsystem/Setting'
import Toggle from '../designsystem/Toggle'

export default function PrefAutoPlay() {
  const [autoPlay, setAutoPlay] = usePreference('autoPlay')
  const toggleAutoPlay = useCallback(() => setAutoPlay(!autoPlay), [autoPlay, setAutoPlay])

  return (
    <Setting
      title='Auto-play'
      description='Start videos automatically once they become visible. This will use more data.'
    >
      <Toggle value={autoPlay} onToggle={toggleAutoPlay} />
    </Setting>
  )
}
