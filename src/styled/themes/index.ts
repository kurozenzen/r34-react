import { DefaultTheme } from 'styled-components'
import { Theme } from 'r34-types'
import light from './light'
import dark from './dark'
import coffee from './coffee'
import electric from './electric'
import deepsea from './deepsea'

const themes: Record<Theme, DefaultTheme> = {
  dark,
  light,
  coffee,
  electric,
  deepsea,
}

export default themes

export const defaultThemeId = 'dark'
