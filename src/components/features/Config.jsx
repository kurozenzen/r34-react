import React, { useCallback } from "react";
import { object, array, func } from "prop-types";
import TagSelector from "../tagSelector/TagSelector";
import TagList from "../tag/TagList";
import Options from "./Options";
import Button from "../common/Button";
import api from "../../misc/api";
import prepare from "../../misc/prepare";

function Config({ options, tags, dispatch }) {
  const search = useCallback(() => {
    api.getPosts(tags, 0, options.rated).then(res => {
      dispatch({
        type: "SET_POSTS",
        posts: res.posts.map(prepare),
        count: Number(res.count)
      });
    });
  }, [dispatch, options.rated, tags]);

  return (
    <section className="search">
      <h3 className="centered">
        <label htmlFor="tag-input">Search</label>
      </h3>
      <TagSelector dispatch={dispatch} />

      {tags.length > 0 ? (
        <label>
          Tags:
          <TagList
            tags={tags}
            activeTags={tags}
            dispatch={dispatch}
            loadAliases
          />
        </label>
      ) : (
        <div className="mb-1" />
      )}
      <Options options={options} dispatch={dispatch} />
      <Button type={"block"} onClick={search}>
        Search
      </Button>
    </section>
  );
}

Config.propTypes = {
  options: object,
  tags: array,
  dispatch: func
};

export default Config;
