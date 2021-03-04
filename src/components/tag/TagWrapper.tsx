import { MouseEventHandler } from 'react'
import styled, { css, DefaultTheme } from 'styled-components'

import { ThemeType } from '../../misc/theme'
import { flexRowWithGap } from '../../styled/mixins'

const dropdownBorderRadius = (collapsed: boolean, theme: ThemeType) =>
  collapsed ? theme.dimensions.borderRadius : `${theme.dimensions.borderRadius} ${theme.dimensions.borderRadius} 0 0`

const switchingColors = (active: boolean, theme: ThemeType) => {
  const fg = active ? theme.colors.backgroundColor : theme.colors.accentColor
  const bg = active ? theme.colors.accentColor : theme.colors.backgroundColor

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

const TagWrapper = styled.div(
  (props: { active: boolean; collapsed: boolean; onMouseLeave: MouseEventHandler; theme: DefaultTheme }) =>
    css`
      ${flexRowWithGap({ theme: props.theme })}
      ${switchingColors(props.active, props.theme)}
      padding: 0 ${props.theme.dimensions.gutter};
      height: ${props.theme.dimensions.blockHeight};
      border-radius: ${dropdownBorderRadius(props.collapsed, props.theme)};
      font-size: ${props.theme.fontSizes.content};
    `
)

export default TagWrapper
