import React from 'react'
import usePreference from '../../hooks/usePreference'
import Setting from '../designsystem/Setting'
import { SmallNumberInput } from '../designsystem/SmallInput'

export default function PrefAutoscrollDelay() {
  const [autoscrollDelay, setAutoscrollDelay] = usePreference('autoscrollDelay')

  return (
    <Setting
      title='Autosroll delay'
      description='Configure how long posts stay on screen in fullscreen view. Time in seconds'
    >
      <SmallNumberInput value={autoscrollDelay} onSubmit={setAutoscrollDelay} min={1} max={60} step={1} />
    </Setting>
  )
}
