import { MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'

import { ThemeType } from '../../misc/theme'

const dropdownBorderRadius = (collapsed: boolean, theme: ThemeType) =>
  collapsed ? theme.dimensions.borderRadius : `${theme.dimensions.borderRadius} ${theme.dimensions.borderRadius} 0 0`

const switchingColors = (active: boolean, theme: ThemeType) => {
  const fg = active ? theme.colors.backgroundColor : theme.colors.accentColor
  const bg = active ? theme.colors.accentColor : theme.colors.backgroundColor

  return css`
    color: ${fg};
    background-color: ${bg};
    border: ${theme.colors.accentColor} ${theme.dimensions.borderWidth} solid;
    transition: background-color 0.4s ease-in-out;

    cursor: pointer;

    :hover,
    :focus,
    :active {
      border-color: ${theme.colors.backgroundColor2};
      color: ${theme.colors.backgroundColor2};

      svg {
        color: ${theme.colors.backgroundColor2} !important;
      }
    }
  `
}

const TagWrapper = styled.div(
  (props: { active: boolean; collapsed: boolean; onMouseLeave: MouseEventHandler; theme: ThemeType }) =>
    css`
      display: flex;
      padding: 0 ${props.theme.dimensions.gutter};
      gap: ${props.theme.dimensions.gutter};
      align-items: center;
      height: ${props.theme.dimensions.blockHeight};
      border-radius: ${dropdownBorderRadius(props.collapsed, props.theme)};
      font-size: ${props.theme.fontSizes.content};
      ${switchingColors(props.active, props.theme)}
    `
)

export default TagWrapper
