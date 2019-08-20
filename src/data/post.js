export default class Post {
  /**
   *
   * @param {*} id
   * @param {*} type
   * @param {*} score
   * @param {*} rating
   * @param {*} source
   * @param {*} tags
   * @param {*} file_url
   * @param {*} width
   * @param {*} height
   * @param {*} creator_id
   * @param {*} creator_url
   * @param {*} preview_url
   * @param {*} preview_width
   * @param {*} preview_height
   * @param {*} sample_url
   * @param {*} sample_width
   * @param {*} sample_height
   * @param {*} status
   * @param {*} parent_id
   * @param {*} has_children
   * @param {*} has_comments
   * @param {*} comments_url
   * @param {*} has_notes
   * @param {*} created_at
   * @param {*} change
   * @param {*} md5
   */
  constructor(
    id,
    score,
    rating,
    source,
    tags,
    media_type,
    media_src,
    file_url,
    thumbnail_src,
    width,
    height,
    creator_id,
    creator_url,
    status,
    parent_id,
    has_children,
    has_comments,
    comments_url,
    has_notes,
    created_at,
    change
  ) {
    this.id = id;

    this.score = score;
    this.rating = rating;
    this.source = source;
    this.tags = tags;

    this.media_type = media_type;
    this.preview_src = media_src;
    this.original_src = file_url;
    this.thumbnail_src = thumbnail_src;
    this.width = width;
    this.height = height;

    this.creator_id = creator_id;
    this.creator_url = creator_url;

    this.status = status;
    this.parent_id = parent_id;
    this.has_children = has_children;
    this.has_comments = has_comments;
    this.comments_url = comments_url;
    this.has_notes = has_notes;
    this.created_at = created_at;
    this.change = change;
  }
}
