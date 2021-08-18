import { MouseEventHandler } from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import { TagIsActive } from '../../data/types'
import { flexRowWithGap, focusBorderAndColor, primaryHover } from '../../styled/mixins'

const dropdownBorderRadius = (collapsed: boolean, theme: DefaultTheme) =>
  collapsed ? theme.dimensions.borderRadius : `${theme.dimensions.borderRadius} ${theme.dimensions.borderRadius} 0 0`

const switchingColors = (active: TagIsActive, collapsed: boolean, theme: DefaultTheme) => {
  switch (active) {
    case 'direct':
      return css`
        ${primaryHover}
      `
    case 'indirect':
      return css`
        color: ${theme.colors.accentColor};
        background-color: ${theme.colors.accentColor}40;

        :hover {
          background-color: ${theme.colors.accentColor}60;
        }

        :active {
          background-color: ${theme.colors.accentColor}50;
        }

        ${focusBorderAndColor}
      `
    case 'no':
      return css`
        color: ${theme.colors.accentColor};

        :hover {
          background-color: ${theme.colors.accentColor}40;
        }

        :active {
          background-color: ${theme.colors.accentColor}20;
        }

        ${focusBorderAndColor}
      `
  }
}

export const ChipWrapper = styled.div(
  (props: { active: TagIsActive; collapsed: boolean; onMouseLeave: MouseEventHandler; theme: DefaultTheme }) =>
    css`
      cursor: pointer;
      border: ${props.theme.colors.accentColor} ${props.theme.dimensions.borderWidth} solid;
      ${flexRowWithGap({ theme: props.theme })}
      ${switchingColors(props.active, props.collapsed, props.theme)}
      padding: 0 ${props.theme.dimensions.gutter};
      height: ${props.theme.dimensions.blockHeight};
      border-radius: ${dropdownBorderRadius(props.collapsed, props.theme)};
      font-size: ${props.theme.fontSizes.content};
      user-select: none;

      ${props.collapsed
        ? ''
        : css`
            border-bottom-color: ${props.theme.colors.accentColor};
          `}

      .aliaslist {
        border-color: ${props.theme.colors.backgroundColor2};
      }
    `
)
