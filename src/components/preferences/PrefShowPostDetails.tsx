import React, { useCallback } from 'react'
import usePreference from '../../hooks/usePreference'
import Setting from '../designsystem/Setting'
import Toggle from '../designsystem/Toggle'

export default function PrefShowPostDetails() {
  const [showPostDetails, setShowPostDetails] = usePreference('showPostDetails')
  const toggleShowPostDetails = useCallback(
    () => setShowPostDetails(!showPostDetails),
    [showPostDetails, setShowPostDetails]
  )

  return (
    <Setting
      title='Show post details'
      description='When enabled, tapping a post shows additional details for the post. This includes tags, rating, likes, the artist and more.'
    >
      <Toggle value={showPostDetails} onToggle={toggleShowPostDetails} />
    </Setting>
  )
}
