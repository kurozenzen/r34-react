import React, { useState } from "react";
import styled, { css } from "styled-components";
import Details from "./Details";
import Player from "../player/Player";
import { useSelector } from "react-redux";
import { selectPreferences } from "../../redux/selectors";
import PostDataClass from "../../data/Post";

const PostWrapper = styled.div(
  (props) => css`
    display: flex;
    flex-direction: column;
    background: ${props.theme.misc.layer};
    ${props.theme.shadow.box};
    border-radius: ${props.theme.dimensions.borderRadius};
    overflow: hidden;
    margin-bottom: ${props.theme.dimensions.bigSpacing};
    box-sizing: border-box;
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

export default function Post(props: PostDataClass) {
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
  } = props;
  const { originals } = useSelector(selectPreferences);
  const media_src = getCorrectSource(originals, big_src, small_src, id);
  const [collapsed, setCollapsed] = useState(true);

  return (
    <PostWrapper>
      <Player
        type={media_type}
        src={media_src}
        thumbnail_src={thumbnail_src}
        toggleDetails={() => setCollapsed(!collapsed)}
      />
      {!collapsed && (
        <Details rating={rating} score={score} source={source} tags={tags} />
      )}
    </PostWrapper>
  );
}
