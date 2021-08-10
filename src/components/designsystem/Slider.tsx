import styled, { DefaultTheme, css } from 'styled-components'

function thumbStyle({ $controls, theme }: { $controls: boolean; theme: DefaultTheme }) {
  const commonStyle = css`
    height: 16px;
    width: 16px;
    border-radius: 100px;
    background: ${$controls ? theme.colors.backgroundColor2 : 'transparent'};
    cursor: pointer;
  `

  return css`
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      ${commonStyle}
    }

    &::-moz-range-thumb {
      ${commonStyle}
    }

    &::-ms-thumb {
      ${commonStyle}
    }
  `
}

function trackStyle({ $accent, theme }: { $accent: boolean; theme: DefaultTheme }) {
  return css`
    -webkit-appearance: none;
    flex-grow: 1;
    background: ${(props) => props.theme.colors.layerBg};
    border-radius: 100px;
    height: 6px;

    &::-moz-range-progress {
      background-color: ${$accent ? theme.colors.accentColor : theme.colors.backgroundColor2};
    }

    &::-ms-fill-lower {
      background-color: ${$accent ? theme.colors.accentColor : theme.colors.backgroundColor2};
    }
  `
}

export const Slider = styled.input(
  ({ $controls, $accent, theme }: { $controls: boolean; $accent: boolean; theme: DefaultTheme }) => css`
    ${trackStyle({ $accent, theme })}
    ${thumbStyle({ $controls, theme })}
  `
)
