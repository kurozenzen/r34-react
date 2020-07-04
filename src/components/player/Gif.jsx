import React, { useState } from "react";
import styled from "styled-components";
import { bool, func, string } from "prop-types";
import Overlay from "./Overlay";

const FlexImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 100vh;
  display: block;
  object-fit: contain;
`;

function Gif(props) {
  const {
    src,
    thumbnail_src,
    isOverlayVisible,
    toggleOverlay,
    toggleDetails,
    areDetailsVisible,
  } = props;

  const [isPaused, setPaused] = useState(true);
  const usedSource = isPaused ? thumbnail_src : src;

  return (
    <>
      <FlexImage src={usedSource} alt={usedSource} onClick={toggleOverlay} />
      <Overlay
        isPlayable
        toggleDetails={toggleDetails}
        isPaused={isPaused}
        isVisible={isOverlayVisible}
        togglePlay={() => setPaused(!isPaused)}
        areDetailsVisible={areDetailsVisible}
      />
    </>
  );
}

Gif.propTypes = {
  src: string.isRequired,
  thumbnail_src: string.isRequired,
  toggleDetails: func.isRequired,
  isOverlayVisible: bool.isRequired,
  toggleOverlay: func.isRequired,
  areDetailsVisible: bool.isRequired,
};

export default Gif;
