import styled, { css } from 'styled-components'

export const C = styled.span(
  ({ theme }) => css`
    background: ${theme.colors.layerBg};
    border-radius: ${theme.dimensions.borderRadius};
    padding: 0 ${theme.dimensions.spacing};
    align-self: center;
    font-weight: bold;
    border: 2px currentColor solid;
  `
)
