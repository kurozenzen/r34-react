import styled, { css } from "styled-components"

export const TextButton = styled.button(
  ({ theme }) => css`
    height: ${theme.dimensions.blockHeight};
    padding: 0 ${theme.dimensions.bigSpacing};
    font-size: ${theme.fontSizes.content};
    border: ${theme.colors.accentColor} ${theme.dimensions.borderWidth} solid;
    border-radius: ${theme.dimensions.borderRadius};

    transition: all ${theme.timings.longTransitionTime} ease-in-out;
  `
)

export const InvisButton = styled.button(
  ({ theme }) => css`
    background-color: transparent;
    border: none;
    padding: ${theme.dimensions.spacing};
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
    color: ${theme.colors.accentColor};
    background: ${theme.colors.backgroundColor};

    :hover {
      background-color: ${theme.colors.accentColor};
      color: ${theme.colors.backgroundColor};
    }

    :active,
    :focus {
      color: ${theme.colors.backgroundColor2};
      border-color: ${theme.colors.backgroundColor2};
    }
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
    border: ${theme.colors.accentColor} ${theme.dimensions.borderWidth} solid;
    border-right-width: 0;
    border-radius: ${theme.dimensions.borderRadius} 0 0 ${theme.dimensions.borderRadius};
    font-weight: bold;
  `
)
