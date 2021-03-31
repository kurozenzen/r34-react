import { DefaultTheme } from 'styled-components'
import { ThemeId } from '../../data/types'
import light from './light'
import dark from './dark'
import coffee from './coffee'
import electric from './electric'

const themes: Record<ThemeId, DefaultTheme> = {
  [ThemeId.DARK]: dark,
  [ThemeId.LIGHT]: light,
  [ThemeId.COFFEE]: coffee,
  [ThemeId.ELECTRIC]: electric,
}

export default themes

export const defaultThemeId = ThemeId.DARK
