import React from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { formatCount } from "../../misc/formatting";
import { selectCount, selectPosts } from "../../redux/selectors";
import Title from "../common/Title";
import PostList from "../post/PostList";
import LoadMore from "./LoadMore";

const ResultsWrapper = styled.section(
  (props) => css`
    > *:not(:last-child) {
      margin-bottom: ${props.theme.dimensions.gutter};
    }
  `
);

export default function Results() {
  const posts = useSelector(selectPosts);
  const count = useSelector(selectCount);

  return (
    <ResultsWrapper className="results">
      <Title>{formatCount(count)} results</Title>
      <PostList posts={posts} />
      <LoadMore />
    </ResultsWrapper>
  );
}
