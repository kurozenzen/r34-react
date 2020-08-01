import React from "react";
import styled from "styled-components";
import Post from "./Post";
import PostDataClass from "../../data/Post";

const PostListWrapper = styled.div``;

interface PostListProps {
  posts: PostDataClass[];
}

export default function PostList(props: PostListProps) {
  const { posts } = props;

  return (
    <PostListWrapper>
      {posts.map((post) => {
        return <Post key={post.id} {...post} />;
      })}
    </PostListWrapper>
  );
}
