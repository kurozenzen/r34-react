/**
 * Metadata. Describes the kind of tag.
 */
export enum TagType {
  GENERAL = 'general',
  CHARACTER = 'character',
  AMBIGUOUS = 'ambiguous',
  ARTIST = 'artist',
  COPYRIGHT = 'copyright',
  RATING = 'rating',
  SOURCE = 'source',
  METADATA = 'metadata',
}

/**
 * Describes how the tag should influence the search.
 */
export enum Modifier {
  PLUS = '+',
  MINUS = '-',
  OR = '~',
}

/**
 * Type of a post according to the backend.
 */
export enum PostType {
  VIDEO = 'video',
  IMAGE = 'image',
}

/**
 * Derived form PostType. On the frontend I split PostType.IMAGE into GIF and PICTURE.
 */
export enum MediaType {
  VIDEO = 'video',
  PICTURE = 'picture',
  GIF = 'gif',
}

/**
 * The possible layouts.
 */
export enum ResultLayout {
  INFINITE_COLUMN = 'infinite_column',
  PAGES = 'pages',
}

/**
 * All routes of the app.
 */
export enum RouteName {
  SEARCH = '/',
  HELP = '/help',
  SETTINGS = '/settings',
  ABOUT = '/about',
}

/**
 * Explicity rating as provided by the backend.
 */
export enum RatingType {
  SAFE = 'safe',
  QUESTIONABLE = 'questionable',
  EXPLICIT = 'explicit',
}

/**
 * All preferences.
 */
export enum PreferenceKey {
  INFINITE = 'infinite',
  RATED = 'rated',
  RATEDThreshold = 'ratedThreshold',
  ORIGINALS = 'originals',
  COOKIES = 'cookies',
  PRELOAD_VIDEOS = 'preloadVideos',
  TAG_SUGGESTIONS_COUNT = 'tagSuggestionsCount',
  RESULTS_LAYOUT = 'resultsLayout',
  PAGE_SIZE = 'pageSize',
  USE_CORS_PROXY = 'useCorsProxy',
}

/**
 * One-time definition of an empty function. Reusing this improves React's performance as it does not break memoization.
 */
export const NO_OP = () => {}

/**
 * Same data as a tag but different names
 */
export type TagLike = {
  name: string
  posts: number
  types: TagType[]
}
