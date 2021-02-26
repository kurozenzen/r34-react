import { css, DefaultTheme } from 'styled-components'

interface PropsWithTheme {
  theme: DefaultTheme
}

/**
 * Gives elements a border TODO: rename to defaultborder
 */
export function defaultBorder({ theme }: PropsWithTheme) {
  return css`
    border-color: ${theme.colors.accentColor};
    border-width: ${theme.dimensions.borderWidth};
    border-radius: ${theme.dimensions.borderRadius};
    border-style: solid;
  `
}

/**
 * Element will look like a new layer TODO: add shadow
 */
export function layer({ theme }: PropsWithTheme) {
  return css`
    background-color: ${theme.colors.layerBg};
    transition-property: background-color;
    transition-duration: ${theme.timings.transitionTime};

    :hover {
      background: ${theme.colors.layerBgHighlight};
    }
  `
}

/**
 * Element becomes accentColor on hover, and is highlighted when active/focused TODO: rename
 */
export function primaryHover({ theme }: PropsWithTheme) {
  return css`
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
}

export function flexColum() {
  return css`
    display: flex;
    flex-direction: column;
  `
}

/**
 * Default spacing for grid and flex
 */
export function gutter({ theme }: PropsWithTheme) {
  return css`
    gap: ${theme.dimensions.gutter};
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
  return width && height
    ? css`
        aspect-ratio: ${width} / ${height};
      `
    : ''
}
