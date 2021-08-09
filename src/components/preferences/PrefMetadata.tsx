import React, { useCallback } from 'react'
import usePreference from '../../hooks/usePreference'
import Setting from '../designsystem/Setting'
import Toggle from '../designsystem/Toggle'

export default function PrefMetadata() {
  const [showMetadata, setShowMetadata] = usePreference('showMetadata')
  const toggleShowMetadata = useCallback(() => setShowMetadata(!showMetadata), [showMetadata, setShowMetadata])

  return (
    <Setting
      title='Show post metadata'
      description="Posts display more data in their details. Mainly for developing purposes but maybe it's useful to someone."
    >
      <Toggle value={showMetadata} onToggle={toggleShowMetadata} />
    </Setting>
  )
}
