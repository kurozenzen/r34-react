import React, { MouseEventHandler } from "react";
import Button from "../common/Button";
import { ExpandIcon, PlayIcon, PauseIcon } from "../../icons/Icons";
import styled, { css, keyframes } from "styled-components";
import { NO_OP } from "../../data/constants";
import useToggle from "../../misc/useToggle";

const fade = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const Wrapper = styled.div(
  (props: { isVisible: boolean }) => css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    ${!props.isVisible
      ? css`
          opacity: 0;
          animation: ${fade} 0.4s ease-in-out;
        `
      : ""};
  `
);

const ProgressBar = styled.div(
  (props) => css`
    position: absolute;
    left: 0;
    bottom: 0;
    height: 5px;
    background-color: ${props.theme.colors.accentColor};
  `
);

interface OverlayProps {
  onFullscreen?: MouseEventHandler;
  togglePlay?: MouseEventHandler;
  isPaused?: boolean;
  isPlayable: boolean;
  currentTime?: number;
  duration?: number;
}

function Overlay(props: OverlayProps) {
  const {
    onFullscreen = NO_OP,
    togglePlay = NO_OP,
    isPaused = true,
    isPlayable = false,
    currentTime = 0,
    duration = null,
  } = props;

  const [isVisible, toggleVisible] = useToggle();

  return (
    <Wrapper isVisible={isPaused || isVisible} onClick={toggleVisible}>
      {onFullscreen && (
        <Button type="topLeft" onClick={onFullscreen} label="Open Fullscreen">
          <ExpandIcon color="white" />
        </Button>
      )}

      {isPlayable && (
        <>
          <Button type="center" onClick={togglePlay} label="Play/Pause">
            {isPaused ? (
              <PlayIcon color="white" size={50} />
            ) : (
              <PauseIcon color="white" size={50} />
            )}
          </Button>
          {!!duration && !!currentTime && (
            <ProgressBar
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Overlay;
