import styled, { css } from 'styled-components'
import { flexRowWithGap } from '../../styled/mixins/layout'

const ColoredIconLink = styled.a(
  ({ color, theme }) => css`
    ${flexRowWithGap({ theme })}
    ${color
      ? css`
          color: ${color} !important;
        `
      : ''};
    white-space: nowrap;

    svg {
      height: 16px;
    }
  `
)

export default ColoredIconLink
