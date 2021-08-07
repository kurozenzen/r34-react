import { MouseEventHandler, useCallback } from 'react'

import { ExpandIcon, ExternalLinkIcon, CloseIcon, DownloadIcon, ArrowDown } from '../../icons/FontAwesomeIcons'
import styled, { css } from 'styled-components'
import useToggle from '../../hooks/useToggle'
import { fadeOut } from '../../styled/animations'
import { NO_OP } from '../../data/types'
import { formatDuration } from '../../misc/formatting'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectFullsceenState,
  selectNextIndex,
  selectPreviousIndex,
  selectPostById,
  selectPosts,
} from '../../redux/selectors'
import { enterFullscreen, exitFullscreen, setFullScreenPost } from '../../redux/actions'
import { download } from '../../data/utils'
import ProgressBar from './ProgressBar'
import { dropShadow, gutter } from '../../styled/mixins'
import { PlayPauseIcon } from '../../icons/PlayPauseIcon'

function overlayVisibility({ isVisible }: { isVisible: boolean }) {
  return isVisible
    ? css``
    : css`
        opacity: 0;
        animation: ${fadeOut} 0.4s ease-in;
      `
}

const Wrapper = styled.div`
  grid-area: 1/1/2/2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto auto;
  z-index: 1;

  ${overlayVisibility};
`

const VideoProgressBar = styled(ProgressBar)`
  grid-area: 4/1/4/4;
`

const ExpandButton = styled(ExpandIcon)(
  ({ theme }) => css`
    grid-area: 1/1/2/2;
    place-self: start start;
    ${dropShadow}
    margin: ${theme.dimensions.gutter};
  `
)

const CloseButton = styled(CloseIcon)(
  ({ theme }) => css`
    grid-area: 1/1/2/2;
    place-self: start start;
    ${dropShadow}
    margin: ${theme.dimensions.gutter};
  `
)

const LinkList = styled.div`
  grid-area: 3/1/4/2;
  place-self: end stretch;
  display: flex;
  place-items: start center;
  ${gutter}

  > svg {
    ${dropShadow}
  }
`

const ScrollHint = styled(ArrowDown)`
  grid-area: 3/2/4/3;
  place-self: end center;
  height: 32px;
  width: 32px;
`

const PlayButton = styled(PlayPauseIcon)`
  height: 50px;
  width: 50px;
  grid-area: 2/2/3/3;
  place-self: center center;
  fill: white;
  ${dropShadow}
`

const PreviousButton = styled.div`
  grid-area: 2/1/3/2;
`

const NextButton = styled.div`
  grid-area: 2/3/3/4;
`

const LengthDisplay = styled.span(
  (props) => css`
    grid-area: 3/3/4/4;
    place-self: end end;
    background: #00000080;
    border-radius: 4px;
    padding: ${props.theme.dimensions.spacing};
    margin: ${props.theme.dimensions.gutter};
  `
)

interface OverlayProps {
  postId: number
  togglePlay?: () => void
  isPaused?: boolean
  isPlayable: boolean
  currentTime?: number
  duration?: number
  mediaRef?: HTMLVideoElement | null
}

function Overlay(props: OverlayProps) {
  const {
    togglePlay = NO_OP,
    isPaused = true,
    isPlayable = false,
    currentTime = 0,
    duration = null,
    mediaRef,
    postId,
  } = props

  const dispatch = useDispatch()

  const [isVisible, toggleVisible] = useToggle()

  const post = useSelector(selectPostById(postId))
  const posts = useSelector(selectPosts)
  const isReaderOpen = useSelector(selectFullsceenState)

  const nextIndex = useSelector(selectNextIndex)
  const previousIndex = useSelector(selectPreviousIndex)

  const onDownloadClick = useCallback<MouseEventHandler>(
    (event) => {
      event.stopPropagation()
      download(post.file_url)
    },
    [post.file_url]
  )

  const onExpandClick = useCallback<MouseEventHandler>(
    (event) => {
      event.stopPropagation()

      if (isReaderOpen) {
        dispatch(exitFullscreen())
      } else {
        mediaRef && mediaRef.pause()
        dispatch(enterFullscreen(postId))
      }
    },
    [dispatch, isReaderOpen, mediaRef, postId]
  )

  const handlePlayPressed: MouseEventHandler = useCallback(
    (event) => {
      event.stopPropagation()
      togglePlay()
    },
    [togglePlay]
  )

  const selectPostAt = useCallback(
    (index: number) => {
      const postAtindex = posts[index]

      if (postAtindex) {
        dispatch(setFullScreenPost(postAtindex.id))
      }
    },
    [dispatch, posts]
  )

  const selectNext = useCallback(() => {
    if (nextIndex !== undefined) {
      selectPostAt(nextIndex)
    }
  }, [selectPostAt, nextIndex])

  const selectPrevious = useCallback(() => {
    if (previousIndex !== undefined) {
      selectPostAt(previousIndex)
    }
  }, [selectPostAt, previousIndex])

  const onSeek = useCallback(
    (value: number) => {
      if (mediaRef) {
        mediaRef.currentTime = value
      }
    },
    [mediaRef]
  )

  return (
    <Wrapper isVisible={isPaused || isVisible} onClick={toggleVisible} data-testid='overlay-wrapper'>
      {isReaderOpen ? (
        <CloseButton color='white' onClick={onExpandClick} aria-label='Open Fullscreen' />
      ) : (
        <ExpandButton color='white' onClick={onExpandClick} aria-label='Open Fullscreen' />
      )}

      <LinkList>
        <a
          href={post.file_url}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Open In New Tab'
          title={post.file_url}
        >
          <ExternalLinkIcon color='white' />
        </a>

        <DownloadIcon color='white' aria-label='Download Image' onClick={onDownloadClick} title={post.file_url} />
      </LinkList>

      {isPlayable && (
        <>
          <PlayButton isPaused={isPaused} onClick={handlePlayPressed} aria-label='Play/Pause' />

          {!!duration && !!currentTime && (
            <VideoProgressBar value={currentTime} maxValue={duration} onChange={onSeek} />
          )}

          {mediaRef && !isNaN(mediaRef.duration) && <LengthDisplay>{formatDuration(mediaRef.duration)}</LengthDisplay>}
          {post.type === 'gif' && <LengthDisplay>GIF</LengthDisplay>}
        </>
      )}

      {isReaderOpen && <PreviousButton onClick={selectPrevious}></PreviousButton>}
      {isReaderOpen && <NextButton onClick={selectNext}></NextButton>}
      {isReaderOpen && <ScrollHint />}
    </Wrapper>
  )
}

export default Overlay
