import React, { SVGProps, useCallback, MouseEventHandler } from 'react'
import styled from 'styled-components'
import { NO_OP } from '../data/types'
import useToggle from '../hooks/useToggle'

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

export function PlayPauseIcon(props: SVGProps<SVGElement>) {
  const { onClick = NO_OP, className } = props

  const [state, toggleState] = useToggle(true)

  const internalOnClick: MouseEventHandler<SVGElement> = useCallback(
    (event) => {
      onClick(event)
      toggleState()
    },
    [onClick, toggleState]
  )

  return (
    <MorphSvg
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      onClick={internalOnClick}
      className={`${className} ${state ? 'play' : 'pause'}`}
    >
      <rect className='left' color='currentColor' x='0' y='0' width='24' height=' 24' />
      <rect className='right' color='currentColor' x='0' y='0' width='24' height=' 24' />
    </MorphSvg>
  )
}
