import { createGlobalStyle, css } from "styled-components"
import { ThemeType } from "./misc/theme"

export default createGlobalStyle(
  (props: { theme: ThemeType }) => css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      font-family: "Raleway", sans-serif;
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
      font-size: ${props.theme.fontSizes.content};
      color: ${props.theme.colors.backgroundColor2};
      background-color: ${props.theme.colors.backgroundColor};
    }

    a {
      color: ${props.theme.colors.accentColor};
      text-decoration: none;
    }
  `
)
