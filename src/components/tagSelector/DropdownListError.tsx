import styled, { css } from 'styled-components'

export const DropdownListError = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    min-height: ${theme.dimensions.blockHeight}; // COMPAT: Kiwi Browser
    background: ${theme.colors.backgroundColor2};
    padding: 6px;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
  `
)
