import { css } from 'styled-components'
import { defaultBlock } from './layout'
import { PropsWithTheme, SupportsDisable } from './types'

/**
 * Adds a short transition to every attribute
 */
export function transitionAll({ theme }: PropsWithTheme) {
  return css`
    transition: all ${theme.timings.transitionTime} linear;
  `
}

/**
 * Sets border-radius to the default
 */
export function borderRadius({ theme }: PropsWithTheme) {
  return css`
    border-radius: ${theme.dimensions.borderRadius};
  `
}

/**
 * Gives elements a border
 */
export function defaultBorder({ theme }: PropsWithTheme) {
  return css`
    border-color: ${theme.colors.accentColor};
    border-width: ${theme.dimensions.borderWidth};
    border-style: solid;
    ${borderRadius}
  `
}

/**
 * Accent colored element with hover/focus/active/disabled states
 */
export function primary({ theme, disabled }: PropsWithTheme & Partial<SupportsDisable>) {
  return css`
    color: ${theme.colors.backgroundColor};
    background-color: ${disabled ? theme.colors.subduedText : theme.colors.accentColor};
    border: none;

    ${transitionAll}
    ${pointerInteraction}
  `
}

/**
 * Transparent with text and border in accentcolor
 */
export function secondary({ theme, disabled }: PropsWithTheme & Partial<SupportsDisable>) {
  const foreground = disabled ? theme.colors.subduedText : theme.colors.accentColor

  return css`
    color: ${foreground};
    background-color: transparent;

    ${transitionAll}
    ${defaultBorder}
    ${pointerInteraction}
  `
}

export function focus({ theme }: PropsWithTheme) {
  return css`
    :focus {
      color: ${theme.colors.backgroundColor2};
      border-color: ${theme.colors.backgroundColor2};
    }
  `
}

export function pointerInteraction({ disabled }: PropsWithTheme & Partial<SupportsDisable>) {
  return disabled
    ? ''
    : css`
        :hover {
          filter: brightness(120%);
        }

        :focus {
          ${focus}
        }

        :active {
          filter: brightness(90%);
        }
      `
}

/**
 * Element will look like a new layer
 */
export function layer({ theme }: PropsWithTheme) {
  return css`
    background-color: ${theme.colors.layerBg};
    ${borderRadius}
  `
}

/**
 * Element will look like a new layer
 */
export function solidLayer({ theme }: PropsWithTheme) {
  return css`
    background-color: ${theme.colors.layerBgSolid};
    ${borderRadius}
  `
}

/**
 * Height and coloring for most inputs
 */
export function defaultInput({ theme }: PropsWithTheme) {
  return css`
    ${defaultBorder}
    ${defaultBlock}
   
    background-color: ${theme.colors.backgroundColor2};
    cursor: pointer;
  `
}
