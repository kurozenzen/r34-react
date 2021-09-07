import styled, { css } from 'styled-components'
import { buttonBaseStyle } from '../../styled/mixins/layout'
import { dropShadow } from '../../styled/mixins/shadow'
import { defaultBorder, primary, transitionAll } from '../../styled/mixins/theming'

const TextButton = styled.button`
  ${buttonBaseStyle}
`

export const LinkButton = styled.a(
  ({ theme }) => css`
    ${buttonBaseStyle}

    gap: ${theme.dimensions.bigSpacing};
    padding: 0 ${theme.dimensions.hugeSpacing};
    background-color: ${theme.colors.layerBg};
    border-radius: ${theme.dimensions.borderRadius};
    color: ${theme.colors.text};

    :visited {
      color: ${theme.colors.text} !important;
      text-decoration: none !important;
    }

    :hover {
      opacity: 0.8;
      text-decoration: none !important;
    }

    :active {
      opacity: 0.6;
      text-decoration: none !important;
    }
  `
)

export const InvisButton = styled.button(
  ({ theme }) => css`
    background-color: transparent;
    border: none;
    padding: ${theme.dimensions.bigSpacing};
    color: ${theme.colors.text};
    cursor: pointer;
    font-size: ${theme.fontSizes.content};

    ${dropShadow}

    svg {
      ${transitionAll}
    }
  `
)

export const PrimaryButton = styled(TextButton)(
  ({ theme }) => css`
    ${primary}

    gap: ${theme.dimensions.bigSpacing};
    padding: 0 ${theme.dimensions.hugeSpacing};
  `
)

export const BlockButton = styled(PrimaryButton)`
  width: 100%;
`

export const AddButton = styled(PrimaryButton)(
  ({ theme }) => css`
    border-radius: 0 ${theme.dimensions.borderRadius} ${theme.dimensions.borderRadius} 0;
    min-width: ${theme.dimensions.blockHeight};
  `
)

export const ModifierButton = styled(TextButton)(
  ({ theme }) => css`
    background-color: transparent;
    min-width: 48px;
    font-size: 24px;

    :focus {
      text-decoration: none;
    }

    ${defaultBorder}
    border-right-width: 0;
    border-radius: ${theme.dimensions.borderRadius} 0 0 ${theme.dimensions.borderRadius};
  `
)
