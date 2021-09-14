import { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle(
  ({ theme }) => css`
    p,
    a,
    button,
    span,
    div,
    select,
    input {
      font-family: 'Raleway', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-size: ${theme.fontSizes.content};
    }

    html {
      background-color: ${theme.colors.backgroundColor};
    }

    body {
      font-size: ${theme.fontSizes.content};
      color: ${theme.colors.text};
      background-color: ${theme.colors.backgroundColor};
      transition: color 0.4s, background-color 0.4s;

      // always show scrollbar to prevent layout shifts when changing pages
      overflow-y: scroll;
    }

    a {
      color: ${theme.colors.accentColor};
      text-decoration: none;
    }

    // Not a touch device
    // Touch devices have nice scrollbars by default
    @media (pointer: fine) {
      // Underline stuff that is focused on non-touch devices
      // makes keyboard navigation clearer
      button,
      input,
      select {
        &:focus {
          text-decoration: underline;
        }
      }

      ::-webkit-scrollbar {
        height: 8px;
        transition: all ${theme.timings.transitionTime} ease-in-out;

        :hover {
          background: ${theme.colors.layerBg};
        }
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: transparent;
      }

      /* Handle */
      :hover {
        ::-webkit-scrollbar {
          background: ${theme.colors.layerBg};
        }
      }

      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.layerBg};
        border-radius: 1000px;

        :hover {
          background: ${theme.colors.layerBgHighlight};
        }
      }
    }
  `
)
