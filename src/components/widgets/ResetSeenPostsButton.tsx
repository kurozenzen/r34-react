import React, { useCallback } from 'react'
import { resetSeenPosts } from '../../data/firebaseFunctions'
import { BlockButton } from '../common/Buttons'

export default function ResetSeenPostsButton() {
  const onResetSeenPosts = useCallback(resetSeenPosts, [])

  return <BlockButton onClick={onResetSeenPosts}>Reset seen posts</BlockButton>
}
