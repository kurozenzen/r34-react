import { Modifier } from '../data/types'
import { PreferencesState } from '../redux/reducers/preferences'

export type SupertagDetails = {
  description: string
  tags: Record<string, Modifier>
}

export type User = {
  preferences: PreferencesState
}
