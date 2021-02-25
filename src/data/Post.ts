import { RatingType, PostType } from './types'
import TagDataClass from './Tag'

export default class PostDataClass {
  id: number

  score: number
  rating: RatingType
  source: string
  tags: TagDataClass[]

  media_type: PostType

  thumbnail_src: string
  small_src: string
  big_src: string

  width: number
  height: number

  creator_id: number
  creator_url: string

  status: string
  parent_id: number
  has_children: boolean
  has_comments: boolean
  comments_url: string
  has_notes: boolean
  created_at: string
  change: string

  constructor(
    id: number,
    score: number,
    rating: string,
    source: string,
    tags: TagDataClass[],
    media_type: string,
    media_src: any,
    file_url: any,
    thumbnail_src: string,
    width: number,
    height: number,
    creator_id: number,
    creator_url: string,
    status: string,
    parent_id: number,
    has_children: boolean,
    has_comments: boolean,
    comments_url: string,
    has_notes: boolean,
    created_at: string,
    change: string
  ) {
    this.id = id

    this.score = score
    this.rating = rating as RatingType
    this.source = source
    this.tags = tags

    this.media_type = media_type as PostType
    this.small_src = media_src
    this.big_src = file_url
    this.thumbnail_src = thumbnail_src

    this.width = width
    this.height = height

    this.creator_id = creator_id
    this.creator_url = creator_url

    this.status = status
    this.parent_id = parent_id
    this.has_children = has_children
    this.has_comments = has_comments
    this.comments_url = comments_url
    this.has_notes = has_notes
    this.created_at = created_at
    this.change = change
  }
}
