import { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle(
  ({ theme }) => css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      font-family: 'Raleway', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      :focus {
        outline: none;
        text-decoration: underline;
      }
    }

    html,
    body,
    #app-root {
      width: 100%;
      height: 100%;
    }

    body {
      font-size: ${theme.fontSizes.content};
      color: ${theme.colors.backgroundColor2};
      background-color: ${theme.colors.backgroundColor};
    }

    a {
      color: ${theme.colors.accentColor};
      text-decoration: none;
    }

    // Not a touch device
    // Touch devices have nice scrollbars by default
    @media (not(pointer: coarse)) {
      ::-webkit-scrollbar {
        height: 8px;

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
