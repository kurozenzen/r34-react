import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import useThrottledEffect from 'use-throttled-effect'
import { openFullscreen } from '../../data/browserUtils'
import PostDataClass from '../../data/PostDataClass'
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
  selectUseCorsProxy,
} from '../../redux/selectors'
import Player from '../player/Player'
import Details from '../post/details/Details'

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
  const fullScreenPost = useSelector(selectFullScreenPost) as PostDataClass
  const fullScreenIndex = useSelector(selectFullScreenIndex)
  const useCorsProxy = useSelector(selectUseCorsProxy)

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

  const { media_type, small_src, big_src, thumbnail_src, id, width, height } = fullScreenPost
  const media_src = getCorrectSource(originals, useCorsProxy, big_src, small_src)

  return (
    <FullScreenDiv ref={setReaderRef}>
      <Player
        onLoad={NO_OP}
        type={media_type}
        src={media_src}
        thumbnail_src={thumbnail_src}
        postId={id}
        width={width}
        height={height}
      />
      <Details postId={id} activeTab={activeTab} setActiveTab={setActiveTab} />
    </FullScreenDiv>
  )
}
