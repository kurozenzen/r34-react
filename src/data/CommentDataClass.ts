export default class CommentDataClass {
  created_at: string
  body: string
  creator: string
  id: number
  creator_id: number

  constructor(created_at: string, body: string, creator: string, id: string, creator_id: string) {
    this.created_at = created_at
    this.body = body
    this.creator = creator
    this.id = Number(id)
    this.creator_id = Number(creator_id)
  }
}
