import styled, { css } from 'styled-components'
import { fadeOut } from '../../styled/animations'
import { formatDuration } from '../../misc/formatting'
import { ProgressBar } from './ProgressBar'
import { PlayPauseIcon } from '../../icons/PlayPauseIcon'
import ToggleFullscreenButton from './ToggleFullscreenButton'
import LinkList from './LinkList'
import React, { useCallback } from 'react'
import FullscreenProgressBar from './FullscreenProgressBar'
import { BackwardIcon, ForwardIcon } from '../../icons/FontAwesomeIcons'
import { dropShadow } from '../../styled/mixins/shadow'

function overlayVisibility({ isVisible }: { isVisible: boolean }) {
  return isVisible
    ? css``
    : css`
        opacity: 0;
        animation: ${fadeOut} 0.4s ease-in;
      `
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto auto;

  ${overlayVisibility};
`

const VideoProgressBar = styled(ProgressBar)(
  ({ theme }) => css`
    grid-area: 4/1/4/4;
    margin: ${theme.dimensions.bigSpacing};
  `
)

const AutoProgressBar = styled(FullscreenProgressBar)(
  ({ theme }) => css`
    grid-area: 4/1/4/4;
    margin: ${theme.dimensions.bigSpacing};
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
    margin: ${props.theme.dimensions.bigSpacing};
  `
)

const ForwardArea = styled.div`
  display: grid;
  grid-area: 2/3/3/4;
  place-items: center;
  opacity: 0;
`

const BackwardArea = styled.div`
  display: grid;
  grid-area: 2/1/3/2;
  place-items: center;
  opacity: 0;
`

type ImageOverlayProps = {
  type: 'image'
  index: number
  fullSrc: string
  isFullscreen: boolean
  onFinished?: () => void
  onBack?: () => void
  isActive: boolean
}

type GifOverlayProps = {
  type: 'gif'
  index: number
  fullSrc: string
  isPaused: boolean
  onTogglePaused: React.MouseEventHandler
  isFullscreen: boolean
  onFinished?: () => void
  onBack?: () => void
  isActive: boolean
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
  onFinished?: () => void
  onBack?: () => void
  isActive: boolean
}

type OverlayProps = (ImageOverlayProps | VideoOverlayProps | GifOverlayProps) & {
  isVisible: boolean
  setVisible: (value: boolean) => void
}

export function ImageOverlay(props: Omit<ImageOverlayProps, 'type'>) {
  const { index, fullSrc, isFullscreen, isActive, onFinished, onBack } = props

  return (
    <>
      <ToggleFullscreenButton index={index} />
      <LinkList fullSrc={fullSrc} />
      {isFullscreen && <AutoProgressBar index={index} onFinished={onFinished} onBack={onBack} isActive={isActive} />}
    </>
  )
}

function GifOverlay(props: Omit<GifOverlayProps, 'type'>) {
  const { fullSrc, isPaused, index, onTogglePaused, isFullscreen, isActive, onFinished, onBack } = props

  return (
    <>
      <ToggleFullscreenButton index={index} />
      <LinkList fullSrc={fullSrc} />
      <PlayButton isPaused={isPaused} onClick={onTogglePaused} aria-label='Play/Pause' />
      {isFullscreen && (
        <AutoProgressBar index={index} isPaused={isPaused} onBack={onBack} onFinished={onFinished} isActive={isActive} />
      )}
      <LengthDisplay>GIF</LengthDisplay>
    </>
  )
}

function VideoOverlay(props: Omit<VideoOverlayProps, 'type'>) {
  const { fullSrc, isPaused, index, onTogglePaused, onSeek, duration, videoRef, isActive, onFinished } = props

  const handleSkipForward = useCallback(
    (e) => {
      e.preventDefault()
      if (videoRef) {
        onSeek(videoRef.currentTime + 10)
      }
    },
    [onSeek, videoRef]
  )

  const handleSkipBackward = useCallback(
    (e) => {
      e.preventDefault()
      if (videoRef) {
        onSeek(videoRef.currentTime - 10)
      }
    },
    [onSeek, videoRef]
  )

  return (
    <>
      <ToggleFullscreenButton index={index} />
      <LinkList fullSrc={fullSrc} />
      <BackwardArea onDoubleClick={handleSkipBackward}>
        <BackwardIcon tabIndex={0} />
      </BackwardArea>
      <PlayButton isPaused={isPaused || !isActive} onClick={onTogglePaused} aria-label='Play/Pause' />
      <ForwardArea onDoubleClick={handleSkipForward}>
        <ForwardIcon tabIndex={0} />
      </ForwardArea>
      <LengthDisplay>{formatDuration(duration)}</LengthDisplay>
      <VideoProgressBar isPaused={isPaused || !isActive} videoRef={videoRef} onChange={onSeek} onEnded={onFinished} />
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
    <Wrapper
      isVisible={isVisible}
      onClick={toggleVisible}
      data-testid='overlay-wrapper'
      data-name='overlay'
      className='overlay'
    >
      {getOverlayContent(props)}
    </Wrapper>
  )
}
