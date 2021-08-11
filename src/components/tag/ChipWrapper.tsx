import { MouseEventHandler } from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import { TagIsActive } from '../../data/types'
import { flexRowWithGap } from '../../styled/mixins'

const dropdownBorderRadius = (collapsed: boolean, theme: DefaultTheme) =>
  collapsed ? theme.dimensions.borderRadius : `${theme.dimensions.borderRadius} ${theme.dimensions.borderRadius} 0 0`

const switchingColors = (active: TagIsActive, theme: DefaultTheme) => {
  const fg = active === 'direct' ? theme.colors.backgroundColor : theme.colors.accentColor
  const bg =
    active === 'direct'
      ? theme.colors.accentColor
      : active === 'indirect'
      ? `${theme.colors.accentColor}40`
      : 'transparent'

  return css`
    color: ${fg};
    background-color: ${bg};
    border: ${theme.colors.accentColor} ${theme.dimensions.borderWidth} solid;
    transition: all ${theme.timings.transitionTime} ease-out;

    svg {
      color: ${fg};
    }

    cursor: pointer;

    :hover,
    :focus,
    :active {
      border-color: ${theme.colors.backgroundColor2};
      color: ${theme.colors.backgroundColor2};

      svg {
        color: ${theme.colors.backgroundColor2};
      }
    }

    :active {
      transform: scale(1.05);
    }
  `
}

export const ChipWrapper = styled.div(
  (props: { active: TagIsActive; collapsed: boolean; onMouseLeave: MouseEventHandler; theme: DefaultTheme }) =>
    css`
      ${flexRowWithGap({ theme: props.theme })}
      ${switchingColors(props.active, props.theme)}
      padding: 0 ${props.theme.dimensions.gutter};
      height: ${props.theme.dimensions.blockHeight};
      border-radius: ${dropdownBorderRadius(props.collapsed, props.theme)};
      font-size: ${props.theme.fontSizes.content};
    `
)
