/**
 * Tabs displayed in Post details
 */
export type ActiveTab = 'tags' | 'comments' | 'metadata'

/**
 * All routes of the app.
 */
export enum RouteName {
  SEARCH = '/',
  PREFERENCES = '/preferences',
  ABOUT = '/about',
  PRIVACY = '/privacy',
  TERMS = '/terms',
  STORIES = '/stories',
  SHARE = '/share',
}

/**
 * All modals the app can display.
 */
export enum ModalId {
  CREATE_SUPERTAG,
  CELLULAR_WARNING,
}

export type EmptyCallback = () => void

/**
 * One-time definition of an empty function. Reusing this improves React's performance as it does not break memoization.
 */
export const NO_OP = () => {}

/**
 * Error sent from the backend when too many tag results were found
 */
export type SuggestionsError = { message: string; results: number }

/**
 * direct: Tag is part of active tags
 * indirect: Tag is part of a supertag that is in active tags
 * no: Tag is not part of supertags at all
 */
export type TagIsActive = 'direct' | 'indirect' | 'no'

/**
 * Unit for display in the TagSelector dropdown
 */
export type CountUnit = 'tags' | 'posts'
