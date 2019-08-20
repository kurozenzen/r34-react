import React from "react";
import { arrayOf, object } from "prop-types";
import Post from "../post/Post";
import "./PostList.css";

function PostList({ posts, activeTags, loadOriginal, onTagClick }) {
  return (
    <ul className="post-list list-group list-group-flush">
      {posts.map(post => {
        return (
          <Post
            key={`p_${post.id}`}
            {...post}
            loadOriginal={loadOriginal}
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
