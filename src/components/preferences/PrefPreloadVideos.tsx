import React, { useCallback } from 'react'
import usePreference from '../../hooks/usePreference'
import Setting from '../designsystem/Setting'
import Toggle from '../designsystem/Toggle'

export default function PrefPreloadVideos() {
  const [preloadVideos, setPreloadVideos] = usePreference('preloadVideos')
  const togglePreloadVideos = useCallback(() => setPreloadVideos(!preloadVideos), [preloadVideos, setPreloadVideos])

  return (
    <Setting
      title='Preload Animations'
      description='Start loading videos and gifs immediately instead of when you click play. This will improve your viewing experience but will consume a LOT of data. Only use with WIFI.'
    >
      <Toggle value={preloadVideos} onToggle={togglePreloadVideos} />
    </Setting>
  )
}
