import React, { MouseEventHandler } from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import { supportsAspectRatio } from '../../data/browserUtils'
import { defaultBorder } from '../../styled/mixins'

const Track = styled.div(
  (props) => css`
    height: 24px;
    width: 50px;
    ${defaultBorder(props)}
    border-radius: 30px;
    background-color: ${props.theme.colors.backgroundColor};
    transition: transform ${props.theme.timings.longTransitionTime} ease-in-out;
  `
)

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
    background-color: ${props.value ? props.theme.colors.accentColor : props.theme.colors.backgroundColor2};
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
    <Track onClick={onToggle}>
      <Thumb value={value} />
    </Track>
  )
}
