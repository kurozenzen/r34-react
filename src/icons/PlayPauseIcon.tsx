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
      $paused={state}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      onClick={internalOnClick}
      className={className}
    >
      <rect className='left' color='currentColor' x='0' y='0' width='24' height=' 24' />
      <rect className='right' color='currentColor' x='0' y='0' width='24' height=' 24' />
    </MorphSvg>
  )
}
