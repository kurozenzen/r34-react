import { TagModifier } from 'r34-types'
import { PreferencesState } from '../redux/reducers/preferences'

export type SupertagDetails = {
  description: string
  tags: Record<string, TagModifier>
}

export type User = {
  preferences: PreferencesState
}
