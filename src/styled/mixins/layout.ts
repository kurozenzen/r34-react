import { css } from 'styled-components'
import { flexRowGap, flexColumnGap, gap, defaultRowSpacing } from './gap'
import { transitionAll } from './theming'
import { PropsWithTheme } from './types'

export function multilineList({ theme }: PropsWithTheme) {
  return css`
    display: flex;
    flex-wrap: wrap;
    ${flexRowGap(theme.dimensions.bigSpacing)}
    ${flexColumnGap(theme.dimensions.bigSpacing)}
  `
}

export function flexColumn() {
  return css`
    display: flex;
    flex-direction: column;
  `
}

export function flexColumnWithGap({ theme }: PropsWithTheme) {
  return css`
    display: flex;
    flex-direction: column;
    ${flexColumnGap(theme.dimensions.bigSpacing)};
  `
}

export function gridWithGap({ theme }: PropsWithTheme) {
  return css`
    display: grid;
    ${gap(theme.dimensions.bigSpacing)}
  `
}

export function flexRowWithGap({ theme }: PropsWithTheme) {
  return css`
    display: flex;
    align-items: center;
    ${flexRowGap(theme.dimensions.bigSpacing)};
  `
}

/**
 * Limits content to a maximum width and centers it
 */
export function centeredMaxWidth({ theme }: PropsWithTheme) {
  return css`
    width: 100%;
    max-width: ${theme.dimensions.bodyWidth};
    margin-left: auto;
    margin-right: auto;
  `
}

/**
 * Fixed height and padding
 */
export function defaultBlock({ theme }: PropsWithTheme) {
  return css`
    height: ${theme.dimensions.blockHeight};
    padding: 0 ${theme.dimensions.bigSpacing};
  `
}

export function fullscreenOverlay() {
  return css`
    position: fixed;
    bottom: 0;
    left: 0;
    ${coverScreen};
  `
}

export function coverScreen() {
  return css`
    width: 100vw;
    height: 100vh;
  `
}

export function buttonBaseStyle({ theme }: PropsWithTheme) {
  return css`
    display: inline-flex;
    align-items: center;
    place-content: center;

    height: ${theme.dimensions.blockHeight};
    cursor: pointer;
    white-space: nowrap;
    border-radius: ${theme.dimensions.borderRadius};
    font-size: ${theme.fontSizes.content};
    ${defaultRowSpacing}
    ${transitionAll}
  `
}
