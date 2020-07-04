import React from "react";
import { bool, func, number } from "prop-types";

import Button from "../common/Button";
import {
  ExpandIcon,
  PlayIcon,
  PauseIcon,
  ArrowDown,
  ArrowUp,
} from "../../icons/Icons";
import styled, { css } from "styled-components";
import { accentColor } from "../../misc/style";
import { NO_OP } from "../../data/constants";

const ProgressBar = styled.div(
  ({ currentTime, duration }) => css`
    position: absolute;
    left: 0;
    bottom: 0;
    height: 5px;
    background-color: ${accentColor};
  `
);

function Overlay(props) {
  const {
    onFullscreen,
    togglePlay,
    isPaused,
    isPlayable,
    currentTime,
    duration,
    isVisible,
    toggleDetails,
    areDetailsVisible,
  } = props;

  return isVisible ? (
    <div>
      {onFullscreen && (
        <Button type="topLeft" onClick={onFullscreen} label="Open Fullscreen">
          <ExpandIcon color="white" />
        </Button>
      )}

      <Button type="bottomLeft" onClick={toggleDetails} label="Toggle Details">
        {areDetailsVisible ? (
          <ArrowUp color="white" />
        ) : (
          <ArrowDown color="white" />
        )}
      </Button>

      {isPlayable && (
        <>
          <Button type="center" onClick={togglePlay} label="Play/Pause">
            {isPaused ? (
              <PlayIcon color="white" size={50} />
            ) : (
              <PauseIcon color="white" size={50} />
            )}
          </Button>
          {!!duration && (
            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          )}
        </>
      )}
    </div>
  ) : null;
}

Overlay.propTypes = {
  onFullscreen: func,
  togglePlay: func,
  isPaused: bool,
  isPlayable: bool,
  currentTime: number,
  duration: number,
  toggleDetails: func.isRequired,
  isVisible: bool.isRequired,
  areDetailsVisible: bool.isRequired,
};

Overlay.defaultProps = {
  onFullscreen: null,
  togglePlay: NO_OP,
  isPaused: true,
  isPlayable: false,
  currentTime: 0,
  duration: null,
};

export default Overlay;
