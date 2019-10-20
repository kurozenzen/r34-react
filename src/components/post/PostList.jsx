import React from "react";
import { arrayOf, object } from "prop-types";
import Post from "./Post";

function PostList({ posts, activeTags, loadOriginal, dispatch }) {
  return (
    <div className="post-list list-group list-group-flush">
      {posts.map(post => {
        return (
          <Post
            key={`p_${post.id}`}
            {...post}
            loadOriginal={loadOriginal}
            activeTags={activeTags}
            dispatch={dispatch}
          />
        );
      })}
    </div>
  );
}

PostList.propTypes = {
  posts: arrayOf(object)
};

export default PostList;
