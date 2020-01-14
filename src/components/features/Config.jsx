import React, { useCallback } from "react";
import { object, array, func } from "prop-types";
import styled from "styled-components";
import TagSelector from "../tagSelector/TagSelector";
import TagList from "../tag/TagList";
import Options from "./Options";
import Button from "../common/Button";
import api from "../../misc/api";
import prepare from "../../misc/prepare";
import { gutter } from "../../misc/style";
import Title from "../common/Title";
import Surface from "../common/Surface";

const ConfigWrapper = styled.section`
  > *:not(:last-child) {
    margin-bottom: ${gutter};
  }
`;

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
    <ConfigWrapper>
      <Title>
        <label htmlFor="tag-input">Search</label>
      </Title>
      <Surface>
        <TagSelector dispatch={dispatch} />

        {tags.length > 0 && (
          <TagList
            tags={tags}
            activeTags={tags}
            dispatch={dispatch}
            loadAliases
          />
        )}
        <Options options={options} dispatch={dispatch} />
        <Button type={"block"} onClick={search}>
          Search
        </Button>
      </Surface>
    </ConfigWrapper>
  );
}

Config.propTypes = {
  options: object,
  tags: array,
  dispatch: func
};

export default Config;
