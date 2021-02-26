import styled, { css } from 'styled-components'

const ColoredIconLink = styled.a(
  ({ color, theme }) => css`
    ${color
      ? css`
          color: ${color} !important;
        `
      : ''};
    display: flex;
    gap: ${theme.dimensions.gutter};
  `
)

export default ColoredIconLink
