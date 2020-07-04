import React, { useCallback, useState } from "react";
import { object, func, array } from "prop-types";
import styled from "styled-components";
import api from "../../misc/api";
import prepare from "../../misc/prepare";
import format from "../../misc/numberFormatting";
import PostList from "../post/PostList";
import Button from "../common/Button";
import Title from "../common/Title";
import Surface, { Line } from "../common/Surface";
import { gutter } from "../../misc/style";

import outOfResultsPicture from "../../icons/OutOfResults.png";

const ResultsWrapper = styled.section`
  > *:not(:last-child) {
    margin-bottom: ${gutter};
  }
`;

let scrollLock = true;

function hasReachedEndOfPage() {
  return (
    window.innerHeight + document.documentElement.scrollTop >=
    document.documentElement.scrollHeight - window.innerHeight
  );
}

function Results({ options, dispatch, tags, results }) {
  const [isOutOfResults, setOutOfResults] = useState(false);
  const loadMore = useCallback(() => {
    api.getPosts(tags, results.page + 1, options.rated).then((res) => {
      setOutOfResults(res.posts.length === 0);
      dispatch({ type: "ADD_POSTS", posts: res.posts.map(prepare) });
      scrollLock = true;
    });
  }, [dispatch, options.rated, results.page, tags]);

  window.onscroll = useCallback(() => {
    if (options.infinite && scrollLock && hasReachedEndOfPage()) {
      scrollLock = false;
      loadMore();
    }
  }, [loadMore, options.infinite]);

  return (
    <ResultsWrapper className="results">
      <Title>{format(results.count)} results</Title>
      <PostList
        posts={results.posts}
        activeTags={tags}
        loadOriginal={options.originals}
        dispatch={dispatch}
      />

      {!options.infinite && !isOutOfResults && (
        <Button type={"block"} onClick={loadMore}>
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
