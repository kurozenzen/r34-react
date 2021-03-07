import React from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import useThrottledEffect from 'use-throttled-effect'
import PostDataClass from '../../data/Post'
import { NO_OP } from '../../data/types'
import { getCorrectSource } from '../../data/utils'
import useAction from '../../hooks/useAction'
import { getMoreResults } from '../../redux/actions'
import {
  selectFullsceenState,
  selectFullScreenIndex,
  selectFullScreenPost,
  selectOriginals,
  selectPosts,
  selectUseCorsProxy,
} from '../../redux/selectors'
import Player from '../player/Player'

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
  const originals = useSelector(selectOriginals)
  const isReaderOpen = useSelector(selectFullsceenState)
  const fullScreenPost = useSelector(selectFullScreenPost) as PostDataClass
  const fullScreenIndex = useSelector(selectFullScreenIndex)
  const useCorsProxy = useSelector(selectUseCorsProxy)

  const loadMore = useAction(getMoreResults)

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
  const media_src = getCorrectSource(originals, useCorsProxy, big_src, small_src)

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
