import React, { useState } from "react";
import styled from "styled-components";
import { arrayOf, func, number, object, string } from "prop-types";
import Media from "./Media";
import Details from "./Details";
import { borderRadius, layer, bigSpacing, shadow } from "../../misc/style";

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${layer};
  ${shadow};
  border-radius: ${borderRadius};
  overflow: hidden;
  margin-bottom: ${bigSpacing};
  border-box: border-box;
`;

export function getCorrectSource(loadOriginal, big_src, small_src, id) {
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

export default function Post({
  id,
  media_type,
  small_src,
  big_src,
  thumbnail_src,
  rating,
  score,
  source,
  tags,
  loadOriginal,
  activeTags,
  dispatch
}) {
  const media_src = getCorrectSource(loadOriginal, big_src, small_src, id);
  const [collapsed, setCollapsed] = useState(true);

  return (
    <PostWrapper>
      <Media
        type={media_type}
        src={media_src}
        thumbnail_src={thumbnail_src}
        isFullscreen={false}
        onFullscreen={() => dispatch({ type: "FOCUS_POST", id: id })}
        onClick={() => setCollapsed(!collapsed)}
      />
      {!collapsed && (
        <Details
          rating={rating}
          score={score}
          source={source}
          tags={tags}
          activeTags={activeTags}
          dispatch={dispatch}
        />
      )}
    </PostWrapper>
  );
}

Post.propTypes = {
  id: number,
  media_type: string,
  media_src: string,
  rating: string,
  score: number,
  source: string,
  tags: arrayOf(object),
  onTagClick: func
};
