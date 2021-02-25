import React, { MouseEventHandler } from "react"
import styled, { css } from "styled-components"
import { ThemeType } from "../../misc/theme"

const Track = styled.div(
  (props) => css`
    border-radius: 30px;
    width: 50px;
    border: ${props.theme.dimensions.borderWidth} solid ${props.theme.colors.accentColor};
    background-color: ${props.theme.colors.backgroundColor};
    transition: transform ${props.theme.timings.longTransitionTime} ease-in-out;
    height: 24px;
  `
)

const Thumb = styled.div(
  (props: { value: boolean; theme: ThemeType }) => css`
    height: 100%;
    aspect-ratio: 1/1;
    background-color: ${props.value ? props.theme.colors.accentColor : props.theme.colors.backgroundColor2};
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    transform: translate(${props.value ? "26px" : "0px"});
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
