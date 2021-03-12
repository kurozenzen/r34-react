interface RawComment {
  created_at: string
  body: string
  creator: string
  id: string
  creator_id: string
}

export function parseComment(rawComment: RawComment) {
  return new CommentDataClass(
    rawComment.created_at,
    rawComment.body,
    rawComment.creator,
    rawComment.id,
    rawComment.creator_id
  )
}

export default class CommentDataClass {
  created_at: number
  body: string
  creator: string
  id: number
  creator_id: number

  constructor(created_at: string, body: string, creator: string, id: string, creator_id: string) {
    this.created_at = Date.parse(created_at)
    this.body = body
    this.creator = creator
    this.id = Number(id)
    this.creator_id = Number(creator_id)
  }
}
