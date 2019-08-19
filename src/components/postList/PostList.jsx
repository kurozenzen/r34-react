import React from "react";
import { arrayOf, object } from "prop-types";
import Post from "../post/Post";

function PostList({ posts, activeTags, onTagClick }) {
  return (
    <ul className="list-group list-group-flush post-list">
      {posts.map(post => {
        return (
          <Post
            key={`p_${post.id}`}
            {...post}
            activeTags={activeTags}
            onTagClick={onTagClick}
          />
        );
      })}
    </ul>
  );
}

PostList.propTypes = {
  posts: arrayOf(object)
};

export default PostList;
