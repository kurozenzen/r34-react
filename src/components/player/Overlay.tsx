import styled, { css } from 'styled-components'
import { fadeOut } from '../../styled/animations'
import { formatDuration } from '../../misc/formatting'
import { ProgressBar } from './ProgressBar'
import { dropShadow } from '../../styled/mixins'
import { PlayPauseIcon } from '../../icons/PlayPauseIcon'
import ToggleFullscreenButton from './ToggleFullscreenButton'
import LinkList from './LinkList'
import React from 'react'
import FullscreenProgressBar from './FullscreenProgressBar'
import { useDispatch } from 'react-redux'
import { setFullscreenPost } from '../../redux/actions'

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

const VideoProgressBar = styled(ProgressBar)(
  ({ theme }) => css`
    grid-area: 4/1/4/4;
    margin: ${theme.dimensions.gutter};
  `
)

const AutoProgressBar = styled(FullscreenProgressBar)(
  ({ theme }) => css`
    grid-area: 4/1/4/4;
    margin: ${theme.dimensions.gutter};
  `
)

const PlayButton = styled(PlayPauseIcon)`
  height: 50px;
  width: 50px;
  grid-area: 2/2/3/3;
  place-self: center center;
  cursor: pointer;
  fill: white;
  ${dropShadow}
`

const LengthDisplay = styled.span(
  (props) => css`
    grid-area: 3/3/4/4;
    place-self: end end;
    background: #00000080;
    color: white;
    border-radius: 4px;
    padding: ${props.theme.dimensions.spacing};
    margin: ${props.theme.dimensions.gutter};
  `
)

type ImageOverlayProps = {
  type: 'image'
  index: number
  fullSrc: string
  isFullscreen: boolean
}

type GifOverlayProps = {
  type: 'gif'
  index: number
  fullSrc: string
  isPaused: boolean
  onTogglePaused: React.MouseEventHandler
  isFullscreen: boolean
}

type VideoOverlayProps = {
  type: 'video'
  index: number
  fullSrc: string
  isPaused: boolean
  duration: number
  onTogglePaused: React.MouseEventHandler
  onSeek: (value: number) => void
  videoRef: HTMLVideoElement | null
  isFullscreen: boolean
}

type OverlayProps = (ImageOverlayProps | VideoOverlayProps | GifOverlayProps) & {
  isVisible: boolean
  setVisible: (value: boolean) => void
}

export function ImageOverlay(props: Omit<ImageOverlayProps, 'type'>) {
  const { index, fullSrc, isFullscreen } = props

  return (
    <>
      <ToggleFullscreenButton index={index} />
      <LinkList fullSrc={fullSrc} />
      {isFullscreen && <AutoProgressBar index={index} />}
    </>
  )
}

function GifOverlay(props: Omit<GifOverlayProps, 'type'>) {
  const { fullSrc, isPaused, index, onTogglePaused, isFullscreen } = props

  return (
    <>
      <ToggleFullscreenButton index={index} />
      <LinkList fullSrc={fullSrc} />
      <PlayButton isPaused={isPaused} onClick={onTogglePaused} aria-label='Play/Pause' />
      {isFullscreen && <AutoProgressBar index={index} isPaused={isPaused} />}
      <LengthDisplay>GIF</LengthDisplay>
    </>
  )
}

function VideoOverlay(props: Omit<VideoOverlayProps, 'type'>) {
  const { fullSrc, isPaused, index, onTogglePaused, onSeek, duration, videoRef, isFullscreen } = props

  const dispatch = useDispatch()

  const handleEnded = React.useCallback(() => {
    if (isFullscreen) {
      dispatch(setFullscreenPost(index + 1))
    }
  }, [dispatch, index, isFullscreen])

  return (
    <>
      <ToggleFullscreenButton index={index} />
      <LinkList fullSrc={fullSrc} />
      <PlayButton isPaused={isPaused} onClick={onTogglePaused} aria-label='Play/Pause' />
      <LengthDisplay>{formatDuration(duration)}</LengthDisplay>
      <VideoProgressBar isPaused={isPaused} videoRef={videoRef} onChange={onSeek} onEnded={handleEnded} />
    </>
  )
}

function getOverlayContent(props: OverlayProps) {
  switch (props.type) {
    case 'image':
      return <ImageOverlay {...props} />
    case 'gif':
      return <GifOverlay {...props} />
    case 'video':
      return <VideoOverlay {...props} />
  }
}

export function Overlay(props: OverlayProps) {
  const { isVisible, setVisible } = props

  const toggleVisible = React.useCallback(() => setVisible(!isVisible), [isVisible, setVisible])

  return (
    <Wrapper isVisible={isVisible} onClick={toggleVisible} data-testid='overlay-wrapper'>
      {getOverlayContent(props)}
    </Wrapper>
  )
}
