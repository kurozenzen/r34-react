export class Post {
    constructor(id, type, score, rating, source, tags, file_url, width, height, creator_id, creator_url, preview_url, preview_width, preview_height, sample_url, sample_width, sample_height, status, parent_id, has_children, has_comments, comments_url, has_notes, created_at, change, md5) {
        this.id = id
        this.type = type

        this.score = score
        this.rating = rating
        this.source = source
        this.tags = tags

        this.file_url = file_url
        this.width = width
        this.height = height

        this.creator_id = creator_id
        this.creator_url = creator_url

        this.preview_url = preview_url
        this.preview_width = preview_width
        this.preview_height = preview_height

        this.sample_url = sample_url
        this.sample_width = sample_width
        this.sample_height = sample_height

        this.status = status
        this.parent_id = parent_id
        this.has_children = has_children
        this.has_comments = has_comments
        this.comments_url = comments_url
        this.has_notes = has_notes
        this.created_at = created_at
        this.change = change
        this.md5 = md5
    }
}