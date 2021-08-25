import { DefaultTheme } from 'styled-components'

export interface PropsWithTheme {
  theme: DefaultTheme
}

export interface SupportsDisable {
  disabled: boolean
}

export interface Size {
  width: number
  height: number
}
