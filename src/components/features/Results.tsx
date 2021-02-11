import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { formatCount } from "../../misc/formatting";
import { getMoreResults } from "../../redux/actions";
import { selectCount, selectPosts } from "../../redux/selectors";
import Title from "../common/Title";
import DynamicList from "../post/DynamicList";
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
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loadMore = useCallback(() => dispatch(getMoreResults()), [dispatch]);

  return (
    <ResultsWrapper className="results">
      <Title>{formatCount(count)} results</Title>
      <DynamicList
        isLoading={isLoading}
        setLoading={setLoading}
        loadMore={loadMore}
      />
    </ResultsWrapper>
  );
}
