import React, { useCallback } from 'react'
import { PreferenceKey } from '../../data/types'
import usePreference from '../../hooks/usePreference'
import Setting from '../common/Setting'
import Toggle from '../common/Toggle'

export default function PrefMetadata() {
  const [showMetadata, setShowMetadata] = usePreference(PreferenceKey.SHOW_METADATA)
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