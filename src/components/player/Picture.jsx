import React from "react";
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

function Picture(props) {
  const {
    src,
    isOverlayVisible,
    toggleOverlay,
    toggleDetails,
    areDetailsVisible,
  } = props;

  return (
    <>
      <FlexImage src={src} alt={src} onClick={toggleOverlay} />
      <Overlay
        isVisible={isOverlayVisible}
        isPlayable={false}
        toggleDetails={toggleDetails}
        isOverlayVisible={isOverlayVisible}
        areDetailsVisible={areDetailsVisible}
      />
    </>
  );
}

Picture.propTypes = {
  src: string.isRequired,
  toggleDetails: func.isRequired,
  isOverlayVisible: bool.isRequired,
  toggleOverlay: func.isRequired,
  areDetailsVisible: bool.isRequired,
};

export default Picture;
