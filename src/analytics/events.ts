import TagDataClass from '../data/Tag'
import { PreferencesState } from '../redux/reducers/preferences'
import { tagsToString } from '../data/utils'

enum AnalyticsEventId {
  SEARCH = 'r34_search',
}

/**
 * Should be called whenever a new search is started.
 */
export const searchEvent = (
  activeTags: Record<string, TagDataClass>,
  page_number: number,
  preferences: PreferencesState
) => ({
  id: AnalyticsEventId.SEARCH,
  payload: {
    active_tags: tagsToString(activeTags),
    page_number,
    preferences,
  },
})
