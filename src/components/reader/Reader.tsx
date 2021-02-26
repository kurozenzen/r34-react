import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import PostDataClass from '../../data/Post'
import { NO_OP } from '../../data/types'
import useAction from '../../hooks/useAction'
import useThrottledEffect from '../../hooks/useThrottledEffect'
import { getMoreResults } from '../../redux/actions'
import { selectFullsceenPostId, selectFullsceenState, selectPosts, selectPreferences } from '../../redux/selectors'
import Player from '../player/Player'
import { getCorrectSource } from '../post/Post'

const FullScreenDiv = styled.div(
  ({ theme }) => css`
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;

    display: grid;
    grid-template-columns: 100vw;
    grid-template-rows: 100vh;

    background: ${theme.colors.backgroundColor};

    z-index: 5;
  `
)

export default function Reader() {
  const posts = useSelector(selectPosts)
  const { originals } = useSelector(selectPreferences)
  const isReaderOpen = useSelector(selectFullsceenState)
  const fullScreenPostId = useSelector(selectFullsceenPostId)
  const loadMore = useAction(getMoreResults)

  const fullScreenPost = useMemo(() => posts.find((post) => post.id === fullScreenPostId) as PostDataClass, [
    fullScreenPostId,
    posts,
  ])

  const fullScreenIndex = posts.indexOf(fullScreenPost)

  useThrottledEffect(
    () => {
      if (fullScreenIndex + 3 > posts.length) {
        loadMore()
      }
    },
    2000,
    [fullScreenIndex, loadMore, posts.length]
  )

  if (!isReaderOpen) {
    return null
  }

  const { media_type, small_src, big_src, thumbnail_src, id, width, height } = fullScreenPost
  const media_src = getCorrectSource(originals, big_src, small_src)

  return (
    <FullScreenDiv>
      <Player
        onLoad={NO_OP}
        type={media_type}
        src={media_src}
        thumbnail_src={thumbnail_src}
        postId={id}
        width={width}
        height={height}
      />
    </FullScreenDiv>
  )
}
