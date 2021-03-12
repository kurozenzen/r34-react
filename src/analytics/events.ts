import TagDataClass from '../data/TagDataClass'
import { tagsToString } from '../data/utils'
import { PreferencesState } from '../redux/reducers/preferences'

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
