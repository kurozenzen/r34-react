import React, { useState, useCallback } from "react";
import styled, { css } from "styled-components";
import Details from "./Details";
import Player from "../player/Player";
import { useSelector } from "react-redux";
import { selectOriginals } from "../../redux/selectors";
import PostDataClass from "../../data/Post";

const ListDiv = styled.div`
  padding-top: 10px;
`;

const PostWrapper = styled.div(
  (props) => css`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    border-radius: ${props.theme.dimensions.borderRadius};
    overflow: hidden;
    width: calc(100% - 20px);
    max-width: 1000px;
    margin: auto;
    box-sizing: border-box;

    > * {
      background: ${props.theme.misc.layer};
    }
  `
);

export function getCorrectSource(
  loadOriginal: boolean,
  big_src: string,
  small_src: string,
  id: number
) {
  let src;
  if (loadOriginal) {
    src = big_src;
  } else {
    src = `${small_src}?${id}`;
    if (src.includes("//images")) {
      src = src.replace("//images", "/images");
    }
  }

  return src;
}

export default function Post(
  props: PostDataClass & { style: any; onLoad: () => void; virtualRef: any }
) {
  const {
    id,
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
  const media_src = getCorrectSource(originals, big_src, small_src, id);
  const [collapsed, setCollapsed] = useState(true);

  const toggleDetails = useCallback(() => {
    setCollapsed(!collapsed);
    setTimeout(onLoad, 100);
  }, [collapsed, onLoad]);

  return (
    <ListDiv style={style} ref={virtualRef} className="list-div">
      <PostWrapper className="post wrapper">
        <Player
          onLoad={onLoad}
          type={media_type}
          src={media_src}
          thumbnail_src={thumbnail_src}
          toggleDetails={toggleDetails}
        />
        {!collapsed && (
          <Details rating={rating} score={score} source={source} tags={tags} />
        )}
      </PostWrapper>
    </ListDiv>
  );
}
