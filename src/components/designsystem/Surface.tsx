import styled from 'styled-components'
import { defaultSpacing } from '../../styled/mixins/gap'
import { layer, solidLayer } from '../../styled/mixins/theming'

/**
 * Includes spacing and background color
 */
export const Surface = styled.div`
  display: grid;
  ${defaultSpacing}
  ${layer}
  width: 100%;
`

/**
 * Includes spacing and background color
 */
export const SolidSurface = styled.div`
  ${defaultSpacing}
  ${solidLayer}
  width: 100%;
`
