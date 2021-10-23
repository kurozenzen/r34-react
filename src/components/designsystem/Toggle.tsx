import React, { MouseEventHandler } from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import { supportsAspectRatio } from '../../data/browserUtils'
import { defaultBorder } from '../../styled/mixins/theming'

const Track = styled.div(
  (props) => css`
    height: 24px;
    width: 50px;
    ${defaultBorder(props)}
    border-radius: 30px;
    background-color: transparent;
    transition: transform ${props.theme.timings.longTransitionTime} ease-in-out;
    cursor: pointer;
  `
)

/**
 * CSS helper that falls back to less fancy styling on older browsers
 */
function circle() {
  return supportsAspectRatio
    ? css`
        height: 100%;
        aspect-ratio: 1/1;
      `
    : css`
        height: 100%;
        width: 22px;
      `
}

const Thumb = styled.div(
  (props: { value: boolean; theme: DefaultTheme }) => css`
    ${circle()}
    background-color: ${props.value ? props.theme.colors.accentColor : props.theme.colors.toggleOff};
    border-radius: 100px;
    transition: all 0.2s ease-in-out;
    transform: translate(${props.value ? '26px' : '0px'});
  `
)

interface ToggleProps {
  value: boolean
  onToggle: MouseEventHandler
}

export default function Toggle(props: ToggleProps) {
  const { value, onToggle } = props

  return (
    <Track onClick={onToggle} role='checkbox' aria-checked={value}>
      <Thumb value={value} />
    </Track>
  )
}
