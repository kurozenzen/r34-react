import React, { useCallback } from 'react'
import usePreference from '../../hooks/usePreference'
import Setting from '../designsystem/Setting'
import Toggle from '../designsystem/Toggle'

export default function PrefShowComments() {
  const [showComments, setShowComments] = usePreference('showComments')
  const toggleShowComments = useCallback(() => setShowComments(!showComments), [showComments, setShowComments])

  return (
    <Setting
      title='Show comments'
      description="If there are comments on a post, they will appear in the details. This preference needs 'Show Post Details' to be enabled to have any effect."
    >
      <Toggle value={showComments} onToggle={toggleShowComments} />
    </Setting>
  )
}
