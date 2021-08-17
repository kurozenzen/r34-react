import { css, DefaultTheme } from 'styled-components'
import { supportsAspectRatio, supportsFlexGap, supportsGap } from '../data/browserUtils'

export interface PropsWithTheme {
  theme: DefaultTheme
}

/**
 * Gives elements a border TODO: rename to defaultborder
 */
export function defaultBorder({ theme }: PropsWithTheme) {
  return css`
    border-color: ${theme.colors.accentColor};
    border-width: ${theme.dimensions.borderWidth};
    ${borderRadius({ theme })}
    border-style: solid;
  `
}

/**
 * Element will look like a new layer
 */
export function layer({ theme }: PropsWithTheme) {
  return css`
    background-color: ${theme.colors.layerBg};
    ${boxShadow({ theme })}
  `
}

/**
 * Element becomes accentColor on hover, and is highlighted when active/focused
 */
export function primaryHover({ theme }: PropsWithTheme) {
  return css`
    color: ${theme.colors.backgroundColor};
    border-color: ${theme.colors.accentColor};
    background-color: ${theme.colors.accentColor};

    transition: color ${theme.timings.transitionTime} linear, border-color ${theme.timings.transitionTime} linear,
      background-color ${theme.timings.transitionTime} linear;

    :hover {
      border-color: ${theme.colors.accentColorHover};
      background-color: ${theme.colors.accentColorHover};
    }

    :active {
      border-color: ${theme.colors.accentColorActive};
      background-color: ${theme.colors.accentColorActive};
    }

    ${focusBorderAndColor}
  `
}

export function focusBorderAndColor({ theme }: PropsWithTheme) {
  return css`
    :focus,
    :focus-within {
      color: ${theme.colors.backgroundColor2};
      border-color: ${theme.colors.backgroundColor2};
    }
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
    ${flexColumnGap(theme.dimensions.gutter)};
  `
}

export function gridWithGap({ theme }: PropsWithTheme) {
  return css`
    display: grid;
    ${gap(theme.dimensions.gutter)}
  `
}

export function flexRowWithGap({ theme }: PropsWithTheme) {
  return css`
    display: flex;
    align-items: center;
    ${flexRowGap(theme.dimensions.gutter)};
  `
}

export function gap(amount: string) {
  return supportsGap
    ? css`
        gap: ${amount};
      `
    : css`
        > :not(:last-child) {
          margin-right: ${amount};
          margin-bottom: ${amount};
        }
      `
}

export function flexRowGap(amount: string) {
  return supportsFlexGap
    ? css`
        gap: ${amount};
      `
    : css`
        > :not(:last-child) {
          margin-right: ${amount};
        }
      `
}

export function flexColumnGap(amount: string) {
  return supportsFlexGap
    ? css`
        gap: ${amount};
      `
    : css`
        > :not(:last-child) {
          margin-bottom: ${amount};
        }
      `
}

/**
 * Default spacing for grid and flex
 */
export function gutter({ theme }: PropsWithTheme) {
  return css`
    ${gap(theme.dimensions.gutter)};
    padding: ${theme.dimensions.gutter};
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
    padding: 0 ${theme.dimensions.gutter};
  `
}

/**
 * Preserves aspect ratio of the element and ensures it is displayed as big as possible
 */
export function flexMedia() {
  return css`
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  `
}

interface Size {
  width: number
  height: number
}

export function preserveAspectRatio({ width, height }: Partial<Size>) {
  if (!width || !height) {
    return ''
  }

  return supportsAspectRatio
    ? css`
        aspect-ratio: ${width} / ${height};
      `
    : css`
        max-width: 100%;
        height: auto;
      `
}

export function borderRadius({ theme }: PropsWithTheme) {
  return css`
    border-radius: ${theme.dimensions.borderRadius};
  `
}

export function boxShadow({ theme }: PropsWithTheme) {
  return css`
    box-shadow: 0 1px ${theme.shadow.radius} ${theme.shadow.color};
  `
}

export function dropShadow({ theme }: PropsWithTheme) {
  return css`
    filter: drop-shadow(0 1px ${theme.shadow.radius} ${theme.shadow.color});
  `
}

export function mediaStyle() {
  return css`
    ${borderRadius}
    ${boxShadow}
    grid-area: 1/1/2/2;
    z-index: 1;
  `
}

export function dropdownScrollbar({ theme }: PropsWithTheme) {
  return css`
    overflow-x: hidden;
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 8px;

      :hover {
        background: ${theme.colors.layerBg};
      }
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: ${theme.colors.backgroundColor2};
      border-left: 1px lightgray solid;
    }

    /* Handle */
    :hover {
      ::-webkit-scrollbar {
        background: ${theme.colors.backgroundColor}20;
      }
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.colors.backgroundColor}40;
      border-radius: 100px;

      :hover {
        background: ${theme.colors.backgroundColor}30;
      }
    }
  `
}
