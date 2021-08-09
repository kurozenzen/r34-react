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
      description="If there are comments on a post, they will appear in the details. They can be a bit weird though, that's why they are disabled by default."
    >
      <Toggle value={showComments} onToggle={toggleShowComments} />
    </Setting>
  )
}
