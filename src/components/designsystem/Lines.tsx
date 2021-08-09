import styled, { css } from 'styled-components'

export const HorizontalLine = styled.div(
  (props) => css`
    align-self: stretch;
    height: 1px;
    background: ${props.theme.colors.layerBg};
  `
)

export const VerticalLine = styled.div(
  (props) => css`
    width: 1px;
    align-self: stretch;
    background: ${props.theme.colors.layerBg};
  `
)
