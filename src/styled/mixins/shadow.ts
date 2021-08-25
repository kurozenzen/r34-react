import { css } from 'styled-components'
import { PropsWithTheme } from './types'

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
