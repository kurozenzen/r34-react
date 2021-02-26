import styled, { css } from 'styled-components'
import { defaultBorder, primaryHover } from '../../styled/mixins'

export const TextButton = styled.button(
  ({ theme }) => css`
    height: ${theme.dimensions.blockHeight};
    padding: 0 ${theme.dimensions.bigSpacing};
    font-size: ${theme.fontSizes.content};
    ${defaultBorder({ theme })}

    transition: all ${theme.timings.longTransitionTime} ease-in-out;
  `
)

export const InvisButton = styled.button(
  ({ theme }) => css`
    background-color: transparent;
    border: none;
    padding: ${theme.dimensions.gutter};
    filter: ${theme.shadow.drop};

    svg {
      transition: all ${theme.timings.transitionTime} ease-in-out;
    }

    :hover {
      svg {
        transform: scale(1.1);
      }
    }
  `
)

export const RedButton = styled(TextButton)(
  ({ theme }) => css`
    ${primaryHover({ theme })}
  `
)

export const BlockButton = styled(RedButton)(
  ({ theme }) => css`
    width: 100%;
  `
)

export const AddButton = styled(RedButton)(
  ({ theme }) => css`
    border-left-width: 0;
    border-radius: 0 ${theme.dimensions.borderRadius} ${theme.dimensions.borderRadius} 0;
  `
)

export const ModifierButton = styled(TextButton)(
  ({ theme }) => css`
    background-color: transparent;
    min-width: 48px;
    font-weight: bold;

    ${defaultBorder({ theme })}
    border-right-width: 0;
    border-radius: ${theme.dimensions.borderRadius} 0 0 ${theme.dimensions.borderRadius};
  `
)
