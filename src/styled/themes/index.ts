import { DefaultTheme } from 'styled-components'
import { Theme } from 'r34-types'
import light from './light'
import dark from './dark'
import coffee from './coffee'
import electric from './electric'

const themes: Record<Theme, DefaultTheme> = {
  dark,
  light,
  coffee,
  electric,
}

export default themes

export const defaultThemeId = 'dark'
