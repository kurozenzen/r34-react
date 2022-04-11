import React, { useCallback } from 'react'
import { resetSeenPosts } from '../../client/firebase'
import { UndoIcon } from '../../icons/FontAwesomeIcons'
import { BlockButton } from '../designsystem/Buttons'

export default function ResetSeenPostsButton() {
  const onResetSeenPosts = useCallback(resetSeenPosts, [])

  return (
    <BlockButton onClick={onResetSeenPosts}>
      <UndoIcon /> Reset seen posts
    </BlockButton>
  )
}
