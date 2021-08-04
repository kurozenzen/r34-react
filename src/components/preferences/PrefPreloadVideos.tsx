import React, { useCallback } from 'react'
import usePreference from '../../hooks/usePreference'
import Setting from '../common/Setting'
import Toggle from '../common/Toggle'

export default function PrefPreloadVideos() {
  const [preloadVideos, setPreloadVideos] = usePreference('preloadVideos')
  const togglePreloadVideos = useCallback(() => setPreloadVideos(!preloadVideos), [preloadVideos, setPreloadVideos])

  return (
    <Setting
      title='Preload Videos'
      description='Start loading videos immediately instead of just-in-time. This can improve the viewing experience but will consume a LOT of data. Only use with WIFI.'
    >
      <Toggle value={preloadVideos} onToggle={togglePreloadVideos} />
    </Setting>
  )
}
