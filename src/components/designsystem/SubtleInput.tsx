import styled, { css, DefaultTheme } from 'styled-components'
import { borderRadius } from '../../styled/mixins/theming'

export const SubtleInput = styled.input(
  (props: { value: string; theme: DefaultTheme }) => css`
    background: ${props.theme.colors.backgroundColor};
    padding: ${props.theme.dimensions.spacing};
    ${borderRadius}
    border: none;
    outline: none;
    color: ${props.theme.colors.accentColor};
    width: 3.4rem;
    text-align: right;
    font-size: ${props.theme.fontSizes.content};

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;
  `
)
