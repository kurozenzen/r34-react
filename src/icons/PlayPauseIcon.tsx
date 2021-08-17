import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'

interface PlayPauseIconProps {
  className?: string
  isPaused: boolean
  onClick: MouseEventHandler<SVGElement>
}

const MorphSvg = styled.svg`
  > rect {
    transition: all 0.2s ease-in;
  }

  &.play {
    .left {
      clip-path: path('M1.61 0 L10.1 4.9 L10.1 19.1 L1.61 24');
    }

    .right {
      clip-path: path('M22.39 12 L9.9 4.79 L9.9 19.21 L22.39 12');
    }
  }

  &.pause {
    .left {
      clip-path: path('M4.8 0 L10 0 L10 24 L4.8 24');
    }

    .right {
      clip-path: path('M19.2 0 L14 0 L14 24 L19.2 24');
    }
  }
`

/**
 * A button that fluidly transforms between a Play and a Pause icon based on isPaused.
 * Use onClick to update isPaused.
 * Additionally, this component takes a classname
 */
export function PlayPauseIcon(props: PlayPauseIconProps) {
  const { onClick, className = '', isPaused } = props

  return (
    <MorphSvg
      name='Play/Pause'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClick}
      className={`${className} ${isPaused ? 'play' : 'pause'}`}
    >
      <rect className='left' color='currentColor' x='0' y='0' width='24' height=' 24' />
      <rect className='right' color='currentColor' x='0' y='0' width='24' height=' 24' />
    </MorphSvg>
  )
}
