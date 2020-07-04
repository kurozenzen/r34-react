import React, { useState } from "react";
import { bool, func, string } from "prop-types";
import styled from "styled-components";

import Video from "./Video";
import Gif from "./Gif";
import Picture from "./Picture";
import { VIDEO, GIF } from "../../data/constants";
import { getMediaType } from "./utils";

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const getMediaByType = (type, src) => {
  switch (getMediaType(type, src)) {
    case VIDEO:
      return Video;
    case GIF:
      return Gif;
    default:
      return Picture;
  }
};

const Player = (props) => {
  const { type, src } = props;
  const Media = getMediaByType(type, src);

  const [isOverlayVisible, setOverlayVisible] = useState(true);

  return (
    <Wrapper>
      <Media
        isOverlayVisible={isOverlayVisible}
        toggleOverlay={() => setOverlayVisible(!isOverlayVisible)}
        {...props}
      />
    </Wrapper>
  );
};

Player.propTypes = {
  type: string.isRequired,
  src: string.isRequired,
  thumbnail_src: string.isRequired,
  toggleDetails: func.isRequired,
  areDetailsVisible: bool.isRequired,
};

export default Player;
