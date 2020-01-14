import React from "react";
import { arrayOf, object } from "prop-types";
import styled from "styled-components";
import Post from "./Post";

const PostListWrapper = styled.div``;

function PostList({ posts, activeTags, loadOriginal, dispatch }) {
  return (
    <PostListWrapper>
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
    </PostListWrapper>
  );
}

PostList.propTypes = {
  posts: arrayOf(object)
};

export default PostList;
