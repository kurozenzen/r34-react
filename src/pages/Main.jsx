import React from "react";
import { withRouter } from "react-router-dom";
import useAppState from "../hooks/useAppState";
import Reader from "./Reader";
import Search from "./Search";

function Main() {
  const [state, dispatch] = useAppState();
  const { results, tags, options, context } = state;

  return context.focusedPost ? (
    <Reader
      focusedPost={context.focusedPost}
      posts={results.posts}
      dispatch={dispatch}
    />
  ) : (
    <Search
      tags={tags}
      options={options}
      results={results}
      dispatch={dispatch}
    />
  );
}

export default withRouter(Main);
