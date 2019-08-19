import Post from "../data/post";
import Tag from "../data/tag";

export default function(obj) {
  return obj.name ? prepareTag(obj) : preparePost(obj);
}

function prepareTag({ name, types, count, modifier }) {
  return new Tag(name, types, Number(count), modifier);
}

function preparePost(post) {
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
    status,
    parent_id,
    has_children,
    has_comments,
    comments_url,
    has_notes,
    created_at,
    change
  } = post;
  return new Post(
    Number(id),
    Number(score),
    rating,
    source,
    tags.map(t => new Tag(t)),
    type,
    sample_url,
    file_url,
    Number(width),
    Number(height),
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
  );
}
