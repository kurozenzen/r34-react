import React, { useCallback } from 'react'
import { resetSeenPosts } from '../../firebase'
import { BlockButton } from '../common/Buttons'

export default function ResetSeenPostsButton() {
  const onResetSeenPosts = useCallback(resetSeenPosts, [])

  return <BlockButton onClick={onResetSeenPosts}>Reset seen posts</BlockButton>
}
