export const GENERAL = "general";
export const CHARACTER = "character";
export const AMBIGUOUS = "ambiguous";
export const ARTIST = "artist";
export const COPYRIGHT = "copyright";
export type TagType =
  | typeof GENERAL
  | typeof CHARACTER
  | typeof AMBIGUOUS
  | typeof ARTIST
  | typeof COPYRIGHT;

export enum Modifier {
  PLUS = "+",
  MINUS = "-",
  OR = "~",
}

export const VIDEO = "video";
export const IMAGE = "image";
export type PostType = typeof VIDEO | typeof IMAGE;

export const PICTURE = "picture";
export const GIF = "gif";
export type MediaType = typeof VIDEO | typeof PICTURE | typeof GIF;

export enum RouteName {
  SEARCH = "/",
  HELP = "/help",
  SETTINGS = "/settings",
}

export const INVISIBLE = "invisible";
export const BLOCK = "block";
export const MODIFIER = "modifier";
export const ADD = "add";
export const RED = "red";
export type ButtonType =
  | typeof INVISIBLE
  | typeof BLOCK
  | typeof MODIFIER
  | typeof ADD
  | typeof RED;

export const SAFE = "safe";
export const QUESTIONABLE = "questionable";
export const EXPLICIT = "explicit";
export type RatingType = typeof SAFE | typeof QUESTIONABLE | typeof EXPLICIT;

export const INFINITE = "infinite";
export const RATED = "rated";
export const RATEDTRESHOLD = "ratedTreshold";
export const ORIGINALS = "originals";
export const COOKIES = "cookies";
export const PRELOAD_VIDEOS = "preload_videos";
export const TAG_SUGGESTION_COUNT = "tag_suggestion_count";

export type PreferenceKey =
  | typeof INFINITE
  | typeof RATED
  | typeof RATEDTRESHOLD
  | typeof ORIGINALS
  | typeof COOKIES
  | typeof PRELOAD_VIDEOS
  | typeof TAG_SUGGESTION_COUNT;

export interface SimpleMap<V> {
  [key: string]: V;
}

export interface SimpleList<V> {
  [key: number]: V;
}

export const NO_OP = () => {};
