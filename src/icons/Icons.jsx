import React from "react";
import styled from "styled-components";
import { TagWrapper } from "../components/tag/Tag";
import { accentColor, backgroundColor2 } from "../misc/style";

export const StyledIcon = styled.i`
  ${({ color, size }) => `
    color: ${color};
    min-width: ${size}px;
    height: ${size}px;

    ${TagWrapper}:hover & {
      color: ${accentColor};
    }

    ${TagWrapper}:active & ,  ${TagWrapper}:focus & {
      color: ${backgroundColor2};
    }
  `}
`;

const IconWrapper = styled.span`
  line-height: 16px;
  ${({ left }) => (left ? "margin-right: 5px;" : "")}
  ${({ right }) => (right ? "margin-left: 5px;" : "")}
`;

const Icon = ({ className, icon, color, size, onClick, left, right }) => (
  <IconWrapper onClick={onClick} left={left} right={right}>
    <StyledIcon
      className={`fas ${icon} ${className}`}
      color={color}
      size={size}
    />
  </IconWrapper>
);

Icon.defaultProps = {
  color: "black",
  size: 14,
};

export const CharacterIcon = styled(Icon).attrs({
  icon: "fa-user",
})``;

export const ArtistIcon = styled(Icon).attrs({
  icon: "fa-pen",
})``;

export const CopyrightIcon = styled(Icon).attrs({
  icon: "fa-copyright",
})``;

export const PlusIcon = styled(Icon).attrs({
  icon: "fa-plus-circle",
})``;

export const MinusIcon = styled(Icon).attrs({
  icon: "fa-minus-circle",
})``;

export const CloseIcon = styled(Icon).attrs({
  icon: "fa-times",
})``;

export const ExpandIcon = styled(Icon).attrs({
  icon: "fa-expand",
})``;

export const ArrowIcon = styled(Icon).attrs({
  icon: "fa-caret-down",
})``;

export const ExternalLinkIcon = styled(Icon).attrs({
  icon: "fa-external-link-alt",
})``;

export const SourceIcon = styled(Icon).attrs({
  icon: "fa-hashtag",
})``;

export const RatingIcon = styled(Icon).attrs({
  icon: "fa-registered",
})``;

export const HeartIcon = styled(Icon).attrs({
  icon: "fa-heart",
})``;

export const PlayIcon = styled(Icon).attrs({
  icon: "fa-play",
})``;

export const PauseIcon = styled(Icon).attrs({
  icon: "fa-pause",
})``;

export const ArrowUp = styled(Icon).attrs({
  icon: "fa-caret-down",
})``;

export const ArrowDown = styled(Icon).attrs({
  icon: "fa-caret-up",
})``;
