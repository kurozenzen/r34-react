import { ArrowDown } from '../../icons/FontAwesomeIcons'
import styled, { css } from 'styled-components'
import useToggle from '../../hooks/useToggle'
import { fadeOut } from '../../styled/animations'
import { formatDuration } from '../../misc/formatting'
import { ProgressBar } from './ProgressBar'
import { dropShadow } from '../../styled/mixins'
import { PlayPauseIcon } from '../../icons/PlayPauseIcon'
import ToggleFullscreenButton from './ToggleFullscreenButton'
import LinkList from './LinkList'
import React from 'react'

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
  cursor: pointer;
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
    color: white;
    border-radius: 4px;
    padding: ${props.theme.dimensions.spacing};
    margin: ${props.theme.dimensions.gutter};
  `
)

type ImageOverlayProps = {
  type: 'image'
  postId: number
  fullSrc: string
}

type GifOverlayProps = {
  type: 'gif'
  postId: number
  fullSrc: string
  isPaused: boolean
  onTogglePaused: React.MouseEventHandler
}

type VideoOverlayProps = {
  type: 'video'
  postId: number
  fullSrc: string
  isPaused: boolean
  duration: number
  onTogglePaused: React.MouseEventHandler
  onSeek: (value: number) => void
  videoRef: HTMLVideoElement | null
}

type OverlayProps = (ImageOverlayProps | VideoOverlayProps | GifOverlayProps) & {
  isVisible: boolean
  setVisible: (value: boolean) => void
}

export function ImageOverlay(props: Omit<ImageOverlayProps, 'type'>) {
  const { fullSrc } = props

  return (
    <>
      <ToggleFullscreenButton postId={props.postId} />
      <LinkList fullSrc={fullSrc} />
    </>
  )
}

function GifOverlay(props: Omit<GifOverlayProps, 'type'>) {
  const { fullSrc, isPaused, postId, onTogglePaused } = props

  return (
    <>
      <ToggleFullscreenButton postId={postId} />
      <LinkList fullSrc={fullSrc} />
      <PlayButton isPaused={isPaused} onClick={onTogglePaused} aria-label='Play/Pause' />
      <LengthDisplay>GIF</LengthDisplay>
    </>
  )
}

function VideoOverlay(props: Omit<VideoOverlayProps, 'type'>) {
  const { fullSrc, isPaused, postId, onTogglePaused, onSeek, duration, videoRef } = props

  return (
    <>
      <ToggleFullscreenButton postId={postId} />
      <LinkList fullSrc={fullSrc} />
      <PlayButton isPaused={isPaused} onClick={onTogglePaused} aria-label='Play/Pause' />
      <LengthDisplay>{formatDuration(duration)}</LengthDisplay>
      <VideoProgressBar isPaused={isPaused} videoRef={videoRef} onChange={onSeek} />
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
