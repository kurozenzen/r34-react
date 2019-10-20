import React, { useCallback } from "react";
import { object } from "prop-types";
import styled from "styled-components";
import Media from "../components/post/Media";
import { MinusIcon, PlusIcon } from "../icons/Icons";

const ReaderWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  overflow: scroll;
  background-color: black;
`;
const Overlay = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
`;

const HiddenImage = styled.img`
  position: fixed;
  left: 100%;
  right: 100%;
`;

export default function Reader({ focusedPost, posts, dispatch }) {
  const postIndex = posts.findIndex(p => p.id === focusedPost);
  const { big_src, media_type, thumbnail_src } = posts[postIndex];
  const prevSrc = posts[postIndex > 0 ? postIndex - 1 : postIndex].big_src;
  const nextSrc =
    posts[postIndex < posts.length - 1 ? postIndex + 1 : postIndex].big_src;

  const prev = useCallback(
    () =>
      postIndex > 0 &&
      dispatch({ type: "FOCUS_POST", id: posts[postIndex - 1].id }),
    [postIndex, dispatch, posts]
  );

  const next = useCallback(
    () =>
      postIndex < posts.length - 1 &&
      dispatch({ type: "FOCUS_POST", id: posts[postIndex + 1].id }),
    [postIndex, dispatch, posts]
  );

  return (
    <ReaderWrapper>
      <Media
        type={media_type}
        src={big_src}
        thumbnail_src={thumbnail_src}
        isFullscreen={true}
        onFullscreen={() => dispatch({ type: "UNFOCUS_POST" })}
        onClick={() => {}}
      />
      <Overlay>
        <MinusIcon onClick={prev} color="white" />
        <PlusIcon onClick={next} color="white" />
      </Overlay>
      <HiddenImage src={prevSrc} />
      <HiddenImage src={nextSrc} />
    </ReaderWrapper>
  );
}

Reader.propTypes = {
  post: object
};
