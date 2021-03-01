import styled, { css } from 'styled-components'
import { flexRowWithGap } from '../../styled/mixins'

const ColoredIconLink = styled.a(
  ({ color, theme }) => css`
    ${flexRowWithGap({ theme })}
    ${color
      ? css`
          color: ${color} !important;
        `
      : ''};
  `
)

export default ColoredIconLink
