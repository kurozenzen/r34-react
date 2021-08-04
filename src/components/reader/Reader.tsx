import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import useThrottledEffect from 'use-throttled-effect'
import { openFullscreen } from '../../data/browserUtils'
import { ActiveTab, NO_OP } from '../../data/types'
import { getCorrectSource } from '../../data/utils'
import useAction from '../../hooks/useAction'
import useFullScreenCloseEffect from '../../hooks/useFullscreenCloseEffect'
import { exitFullscreen, getMoreResults } from '../../redux/actions'
import {
  selectFullsceenState,
  selectFullScreenIndex,
  selectFullScreenPost,
  selectOriginals,
  selectPosts,
} from '../../redux/selectors'
import Player from '../player/Player'
import Details from '../post/details/Details'
import * as r34 from 'r34-types'

const FullScreenDiv = styled.div(
  ({ theme }) => css`
    position: fixed;
    width: 100vw;
    height: 200vh;
    left: 0;
    top: 0;

    display: grid;
    grid-template-columns: 100vw;
    grid-template-rows: 100vh 40px auto;
    overflow: auto;

    background: ${theme.colors.backgroundColor};

    z-index: 5;

    scroll-snap-type: y mandatory;
    //scroll-snap-points-y: 0vh 100vh;

    > * {
      scroll-snap-align: start;
    }
  `
)

export default function Reader() {
  const posts = useSelector(selectPosts)
  const originals = useSelector(selectOriginals)
  const isReaderOpen = useSelector(selectFullsceenState)
  const fullScreenPost = useSelector(selectFullScreenPost) as r34.Post
  const fullScreenIndex = useSelector(selectFullScreenIndex)

  const loadMore = useAction(getMoreResults)

  const [readerRef, setReaderRef] = useState<HTMLDivElement | null>(null)

  useThrottledEffect(
    () => {
      if (fullScreenIndex + 3 > posts.length) {
        loadMore()
      }
    },
    2000,
    [fullScreenIndex, loadMore, posts.length]
  )

  useEffect(() => {
    if (isReaderOpen && readerRef && readerRef !== document.fullscreenElement) {
      openFullscreen(readerRef)
    }
  }, [isReaderOpen, readerRef])

  const [activeTab, setActiveTab] = useState<ActiveTab>('tags')

  const exit = useAction(exitFullscreen)

  useFullScreenCloseEffect(exit)

  if (!isReaderOpen) {
    return null
  }

  const { type, sample_url, file_url, preview_url, id, width, height } = fullScreenPost
  const media_src = getCorrectSource(originals, file_url, sample_url)

  return (
    <FullScreenDiv ref={setReaderRef}>
      <Player
        onLoad={NO_OP}
        type={type}
        src={media_src}
        thumbnail_src={preview_url}
        postId={id}
        width={width}
        height={height}
      />
      <Details postId={id} activeTab={activeTab} setActiveTab={setActiveTab} />
    </FullScreenDiv>
  )
}
