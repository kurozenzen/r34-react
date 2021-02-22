import React, { useState, useCallback, useMemo } from "react";
import styled, { css } from "styled-components";
import Details from "./Details";
import Player from "../player/Player";
import { useSelector } from "react-redux";
import { selectOriginals } from "../../redux/selectors";
import PostDataClass from "../../data/Post";
import LayoutElementProps from "../layout/LayoutElementProps";
import { NO_OP } from "../../data/types";

const ItemWrapper = styled.div(
  ({ theme }) => css`
    padding-top: ${theme.dimensions.gutter};
  `
);

const PositonWrapper = styled.div(
  ({ theme }) => css`
    padding: 0 ${theme.dimensions.gutter};
    width: 100%;
    max-width: ${theme.dimensions.bodyWidth};
    margin: auto;
  `
);

const PostWrapper = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    border-radius: ${theme.dimensions.borderRadius};
    overflow: hidden;
    background: ${theme.misc.layer};
  `
);

export function getCorrectSource(
  loadOriginal: boolean,
  big_src: string,
  small_src: string
) {
  return loadOriginal ? big_src : small_src;
}

export default function Post(props: PostDataClass & LayoutElementProps) {
  const {
    media_type,
    small_src,
    big_src,
    thumbnail_src,
    rating,
    score,
    source,
    tags,
    style,
    onLoad,
    virtualRef,
  } = props;
  const originals = useSelector(selectOriginals);
  const media_src = getCorrectSource(originals, big_src, small_src);
  const [collapsed, setCollapsed] = useState(true);

  const toggleDetails = useCallback(() => {
    setCollapsed(!collapsed);
    onLoad && setTimeout(onLoad, 100);
  }, [collapsed, onLoad]);

  const details = useMemo(
    () => <Details rating={rating} score={score} source={source} tags={tags} />,
    [rating, score, source, tags]
  );

  return (
    <ItemWrapper style={style} ref={virtualRef} className="list-div">
      <PositonWrapper>
        <PostWrapper onClick={toggleDetails} role="row">
          <Player
            onLoad={onLoad || NO_OP}
            type={media_type}
            src={media_src}
            thumbnail_src={thumbnail_src}
          />
          {!collapsed && details}
        </PostWrapper>
      </PositonWrapper>
    </ItemWrapper>
  );
}
