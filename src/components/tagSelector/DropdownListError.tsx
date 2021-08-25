import styled, { css } from 'styled-components'
import { flexRowWithGap } from '../../styled/mixins/layout'

export const DropdownListError = styled.div(
  ({ theme }) => css`
    ${flexRowWithGap}
    flex-wrap: wrap;
    min-height: ${theme.dimensions.blockHeight}; // COMPAT: Kiwi Browser
    background: ${theme.colors.backgroundColor2};
    padding: 6px;
    align-items: center;
    justify-content: center;
    text-align: center;
  `
)
