import React, { useCallback } from "react";
import { object, func, array } from "prop-types";
import api from "../../misc/api";
import prepare from "../../misc/prepare";
import format from "../../misc/numberFormatting";
import PostList from "../post/PostList";
import Button from "../common/Button";

let scrollLock = true;

function hasReachedEndOfPage() {
  return (
    window.innerHeight + document.documentElement.scrollTop >=
    document.documentElement.scrollHeight - window.innerHeight
  );
}

function Results({ options, dispatch, tags, results }) {
  const loadMore = useCallback(() => {
    api.getPosts(tags, results.page + 1, options.rated).then(res => {
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
    <section className="results">
      <h3 className="centered">{format(results.count)} results</h3>
      <PostList
        posts={results.posts}
        activeTags={tags}
        loadOriginal={options.originals}
        dispatch={dispatch}
      />
      {!options.infinite && (
        <Button type={"block"} onClick={loadMore}>
          Load More
        </Button>
      )}
    </section>
  );
}

Results.propTypes = {
  options: object,
  dispatch: func,
  tags: array,
  results: object
};

export default Results;
