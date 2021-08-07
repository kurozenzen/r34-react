enum AnalyticsEventId {
  SEARCH = 'r34_search',
}

export type SearchEvent = {
  id: AnalyticsEventId.SEARCH
  payload: {
    page_number: number
  }
}

/**
 * Should be called whenever a new search is started.
 */
export const searchEvent = (page_number: number): SearchEvent => ({
  id: AnalyticsEventId.SEARCH,
  payload: {
    page_number,
  },
})
