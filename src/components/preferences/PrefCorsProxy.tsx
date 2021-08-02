import React, { useCallback } from 'react'
import { PreferenceKey } from '../../data/types'
import usePreference from '../../hooks/usePreference'
import Setting from '../common/Setting'
import Toggle from '../common/Toggle'

export default function PrefCorsProxy() {
  const [useCorsProxy, setUseCorsProxy] = usePreference(PreferenceKey.USE_CORS_PROXY)
  const toggleUseCorsProxy = useCallback(() => setUseCorsProxy(!useCorsProxy), [useCorsProxy, setUseCorsProxy])

  return (
    <Setting
      title='Use CORS Proxy'
      description='Request images via the built in cors proxy. Normally, this should just make loading times worse. But I have seen the opposite.'
    >
      <Toggle value={useCorsProxy} onToggle={toggleUseCorsProxy} />
    </Setting>
  )
}
