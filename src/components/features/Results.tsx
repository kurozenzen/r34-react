import { array, func, object } from "prop-types";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import outOfResultsPicture from "../../icons/OutOfResults.png";
import api from "../../misc/api";
import { formatCount } from "../../misc/formatting";
import {
  selectActiveTags,
  selectPreferences,
  selectResults,
} from "../../redux/selectors";
import Button from "../common/Button";
import Surface, { Line } from "../common/Surface";
import Title from "../common/Title";
import PostList from "../post/PostList";
import { preparePost } from "../../misc/prepare";

const ResultsWrapper = styled.section(
  (props) => css`
    > *:not(:last-child) {
      margin-bottom: ${props.theme.dimensions.gutter};
    }
  `
);

let scrollLock = true;

function hasReachedEndOfPage() {
  return (
    window.innerHeight + document.documentElement.scrollTop >=
    document.documentElement.scrollHeight - window.innerHeight
  );
}

function Results() {
  const dispatch = useDispatch();
  const activeTags = useSelector(selectActiveTags);
  const { posts, count, pageNumber } = useSelector(selectResults);
  const { rated, infinite, ratedTreshold } = useSelector(selectPreferences);

  const [isOutOfResults, setOutOfResults] = useState(false);

  const loadMore = useCallback(() => {
    api
      .getPosts(activeTags, pageNumber + 1, rated ? ratedTreshold : 0)
      .then((res) => {
        setOutOfResults(res.posts.length === 0);
        dispatch({ type: "ADD_POSTS", posts: res.posts.map(preparePost) });
        scrollLock = true;
      });
  }, [dispatch, rated, pageNumber, ratedTreshold, activeTags]);

  window.onscroll = useCallback(() => {
    if (infinite && scrollLock && hasReachedEndOfPage()) {
      scrollLock = false;
      loadMore();
    }
  }, [loadMore, infinite]);

  return (
    <ResultsWrapper className="results">
      <Title>{formatCount(count)} results</Title>
      <PostList posts={posts} />

      {!infinite && !isOutOfResults && (
        <Button type={"block"} onClick={loadMore} label="Load More">
          Load More
        </Button>
      )}

      {isOutOfResults && (
        <Surface>
          <img src={outOfResultsPicture} alt={outOfResultsPicture} />
          <Line />
          <Title>You have reached the end!</Title>
          <p style={{ textAlign: "center" }}>Go look for something else...</p>
        </Surface>
      )}
    </ResultsWrapper>
  );
}

Results.propTypes = {
  options: object,
  dispatch: func,
  tags: array,
  results: object,
};

export default Results;
