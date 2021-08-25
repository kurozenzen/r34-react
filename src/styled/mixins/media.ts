import { Size } from 'react-virtualized'
import { css } from 'styled-components'
import { supportsAspectRatio } from '../../data/browserUtils'
import { borderRadius } from './theming'

/**
 * Determines how media elements are displayed
 */
export function mediaStyle() {
  return css`
    ${borderRadius}
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

/**
 * Attempts to preserve aspect ration of an element.
 */
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
