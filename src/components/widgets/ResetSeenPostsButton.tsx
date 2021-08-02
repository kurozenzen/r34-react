import React, { useCallback } from 'react'
import { resetSeenPosts } from '../../firebase'
import { UndoIcon } from '../../icons/FontAwesomeIcons'
import { BlockButton } from '../common/Buttons'

export default function ResetSeenPostsButton() {
  const onResetSeenPosts = useCallback(resetSeenPosts, [])

  return (
    <BlockButton onClick={onResetSeenPosts}>
      <UndoIcon /> Reset seen posts
    </BlockButton>
  )
}
