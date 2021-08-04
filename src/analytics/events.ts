import { AnyBiasedTag } from '../../../r34-types'
import { tagsToString } from '../data/utils'
import { PreferencesState } from '../redux/reducers/preferences'

enum AnalyticsEventId {
  SEARCH = 'r34_search',
}

export type SearchEvent = {
  id: AnalyticsEventId.SEARCH
  payload: {
    active_tags: string[]
    page_number: number
    preferences: PreferencesState
  }
}

/**
 * Should be called whenever a new search is started.
 */
export const searchEvent = (
  activeTags: Record<string, AnyBiasedTag>,
  page_number: number,
  preferences: PreferencesState
): SearchEvent => ({
  id: AnalyticsEventId.SEARCH,
  payload: {
    active_tags: tagsToString(activeTags),
    page_number,
    preferences,
  },
})
