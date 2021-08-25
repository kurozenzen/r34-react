import { css } from 'styled-components'
import { supportsFlexGap, supportsGap } from '../../data/browserUtils'
import { PropsWithTheme } from './types'

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
 * `gap` and `padding` set to `bigSpacing`
 */
export function defaultSpacing({ theme }: PropsWithTheme) {
  return css`
    ${gap(theme.dimensions.bigSpacing)};
    padding: ${theme.dimensions.bigSpacing};
  `
}

/**
 * `gap` and `padding` set to `bigSpacing`. `padding` only horizontally.
 * Use `align-items: center` or similar to handle veritcal padding
 */
export function defaultRowSpacing({ theme }: PropsWithTheme) {
  return css`
    ${gap(theme.dimensions.bigSpacing)};
    padding: 0 ${theme.dimensions.bigSpacing};
  `
}
