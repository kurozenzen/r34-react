import React, { SVGProps, useCallback, MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'
import { NO_OP } from '../data/types'
import useToggle from '../hooks/useToggle'

const MorphSvg = styled.svg(
  ({ $paused }: { $paused: boolean }) => css`
    > rect {
      transition: clip-path 0.2s ease-in-out;
    }

    ${$paused
      ? css`
          .left {
            clip-path: path('M6 1.607 L12 5.071 L12 18.928 L6 22.392');
          }

          .right {
            clip-path: path('M12 5.071 L24 12 L24 12 L12 18.928');
          }
        `
      : css`
          .left {
            clip-path: path('M6 2 L10 2 L10 22 L 6 22');
          }

          .right {
            clip-path: path('M14 2 L18 2 L18 22 L 14 22');
          }
        `}
  `
)

const MorphSvg2 = styled.svg`
  > rect {
    transition: all 0.5s ease-in;
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
      clip-path: path('M14 0 L19.2 0 L19.2 24 L14 24');
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
    <MorphSvg2
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      onClick={internalOnClick}
      className={`${className} ${state ? 'play' : 'pause'}`}
    >
      <rect className='left' color='currentColor' x='0' y='0' width='24' height=' 24' />
      <rect className='right' color='currentColor' x='0' y='0' width='24' height=' 24' />
    </MorphSvg2>
  )
}
