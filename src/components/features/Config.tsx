import React, { useCallback } from "react";
import { object, array, func } from "prop-types";
import styled, { css } from "styled-components";
import TagSelector from "../tagSelector/TagSelector";
import TagList from "../tag/TagList";
import Options from "./Options";
import Button from "../common/Button";
import api from "../../misc/api";
import { preparePost } from "../../misc/prepare";
import Title from "../common/Title";
import Surface from "../common/Surface";
import { useDispatch, useSelector } from "react-redux";
import { selectPreferences, selectActiveTags } from "../../redux/selectors";
import { setPosts } from "../../redux/actions";

const ConfigWrapper = styled.section(
  (props) => css`
    > *:not(:last-child) {
      margin-bottom: ${props.theme.dimensions.gutter};
    }
  `
);

function Config() {
  const dispatch = useDispatch();
  const activeTags = useSelector(selectActiveTags);
  const { rated, ratedTreshold } = useSelector(selectPreferences);

  const search = useCallback(() => {
    api
      .getPosts(activeTags, 0, rated ? ratedTreshold : 0)
      .then((res) => dispatch(setPosts(res.posts.map(preparePost), res.count)));
  }, [dispatch, rated, ratedTreshold, activeTags]);

  return (
    <ConfigWrapper>
      <Title>
        <label htmlFor="tag-input">Search</label>
      </Title>
      <Surface>
        <TagSelector />

        {Object.keys(activeTags).length > 0 && (
          <TagList tags={activeTags} loadAliases />
        )}
        <Options />
        <Button type="block" onClick={search} label="Search">
          Search
        </Button>
      </Surface>
    </ConfigWrapper>
  );
}

Config.propTypes = {
  options: object,
  tags: array,
  dispatch: func,
};

export default Config;
