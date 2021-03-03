import PostDataClass from '../data/Post'
import TagDataClass from '../data/Tag'
import { TagType, Modifier, RatingType, PostType } from '../data/types'

/**
 * A tag as received from the backend.
 * All strings
 */
export interface DirtyTag {
  name: string
  types: string[]
  count: string
  modifier: string
}

/**
 * A post as received from the backend.
 * All strings
 */
export interface DirtyPost {
  id: string
  type: string
  score: string
  rating: string
  source: string
  tags: string[]
  file_url: string
  width: string
  height: string
  creator_id: string
  creator_url: string
  sample_url: string
  preview_url: string
  status: string
  parent_id: string
  has_children: string
  has_comments: string
  comments_url: string
  has_notes: string
  created_at: string
  change: string
}

/**
 * Introduce types for nicer use later
 */
export function prepareTag(dirtyTag: DirtyTag) {
  const { name, types, count, modifier } = dirtyTag

  return new TagDataClass(name, types as TagType[], Number(count), modifier as Modifier)
}

/**
 * Introduce types for nicer use later and parse tag names to tag objects.
 */
export function preparePost(post: DirtyPost) {
  const {
    id,
    type,
    score,
    rating,
    source,
    tags,
    file_url,
    width,
    height,
    creator_id,
    creator_url,
    sample_url,
    preview_url,
    status,
    parent_id,
    has_children,
    has_comments,
    comments_url,
    has_notes,
    created_at,
    change,
  } = post
  return new PostDataClass(
    Number(id),
    Number(score),
    rating as RatingType,
    source,
    tags ? tags.map((t) => new TagDataClass(t)) : [],
    type as PostType,
    sample_url,
    file_url,
    preview_url,
    Number(width),
    Number(height),
    Number(creator_id),
    creator_url,
    status,
    Number(parent_id),
    Boolean(has_children),
    Boolean(has_comments),
    comments_url,
    Boolean(has_notes),
    created_at,
    change
  )
}
