import React, { MouseEventHandler, memo } from "react";
import styled, { css } from "styled-components";
import { TagWrapper } from "../components/tag/Tag";
import { ThemeType } from "../misc/theme";

export const StyledIcon = styled.i(
  (props) => css`
    ${(props: { color: string; size: number; theme: ThemeType }) => `
    color: ${props.color};
    min-width: ${props.size}px;
    height: ${props.size}px;

    ${TagWrapper}:hover & {
      color: ${props.theme.colors.accentColor};
    }

    ${TagWrapper}:active & ,  ${TagWrapper}:focus & {
      color: ${props.theme.colors.backgroundColor2};
    }
  `}
  `
);

const IconWrapper = styled.span(
  (props: { left: boolean; right: boolean }) => css`
    line-height: 16px;
    ${props.left ? "margin-right: 5px;" : ""}
    ${props.right ? "margin-left: 5px;" : ""}
  `
);

interface IconProps {
  icon: string;
  className?: string;
  color?: string;
  size?: number;
  onClick?: MouseEventHandler;
  left?: boolean;
  right?: boolean;
  prefix?: string;
}

const Icon = (props: IconProps) => {
  const {
    icon,
    className = "",
    color = "black",
    size = 14,
    onClick = () => {},
    left = false,
    right = false,
    prefix = "fas",
  } = props;
  return (
    <IconWrapper onClick={onClick} left={left} right={right}>
      <StyledIcon
        className={`${prefix} ${icon} ${className}`}
        color={color}
        size={size}
      />
    </IconWrapper>
  );
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

export const ExpandIcon = memo(
  styled(Icon).attrs({
    icon: "fa-expand",
  })``
);

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

export const TwitterIcon = styled(Icon).attrs({
  prefix: "fab",
  icon: "fa-twitter",
})``;

export const LinkIcon = styled(Icon).attrs({
  icon: "fa-link",
})``;

export const PlayIcon = memo(
  styled(Icon).attrs({
    icon: "fa-play",
  })``
);

export const PauseIcon = memo(
  styled(Icon).attrs({
    icon: "fa-pause",
  })``
);

export const ArrowUp = styled(Icon).attrs({
  icon: "fa-caret-down",
})``;

export const ArrowDown = styled(Icon).attrs({
  icon: "fa-caret-up",
})``;
