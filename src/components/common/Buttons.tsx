import styled, { css } from 'styled-components'
import { defaultBorder, dropShadow, primaryHover } from '../../styled/mixins'

const TextButton = styled.button(
  ({ theme }) => css`
    height: ${theme.dimensions.blockHeight};
    padding: 0 ${theme.dimensions.bigSpacing};
    font-size: ${theme.fontSizes.content};
    ${defaultBorder({ theme })}

    transition: all ${theme.timings.longTransitionTime} ease-out;
  `
)

export const InvisButton = styled.button(
  ({ theme }) => css`
    background-color: transparent;
    border: none;
    padding: ${theme.dimensions.gutter};
    ${dropShadow({ theme })}

    svg {
      transition: all ${theme.timings.transitionTime} ease-out;
    }

    :active {
      svg {
        transform: scale(1.1);
      }
    }
  `
)

export const RedButton = styled(TextButton)`
  ${primaryHover}
`

export const BlockButton = styled(RedButton)`
  width: 100%;

  :active {
    transform: scaleX(1.03) scaleY(1.1);
  }
`

export const AddButton = styled(RedButton)(
  ({ theme }) => css`
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
