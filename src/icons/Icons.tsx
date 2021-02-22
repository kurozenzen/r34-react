import React, { MouseEventHandler, memo } from "react";
import styled, { css } from "styled-components";
import { TagWrapper } from "../components/tag/Tag";
import { NO_OP } from "../data/types";

import { ThemeType } from "../misc/theme";

export const StyledIcon = styled.i(
  (props: { color: string; size: number; theme: ThemeType }) => css`
    color: ${props.color};
    min-width: ${props.size}px;
    height: ${props.size}px;

    svg {
      color: ${props.color};
    }

    ${TagWrapper}:hover & {
      color: ${props.theme.colors.accentColor};
    }

    ${TagWrapper}:active & ,  ${TagWrapper}:focus & {
      color: ${props.theme.colors.backgroundColor2};
    }
  `
);

const StyledSvg = styled.svg(
  (props: { size: number } & JSX.IntrinsicAttributes) => css`
    width: ${props.size}px;
    height: ${props.size}px;
  `
);

const IconWrapper = styled.span(
  (props: { left: boolean; right: boolean }) => css``
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
    onClick = NO_OP,
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

export const CodeBranchIcon = styled(Icon).attrs({
  icon: " fa-code-branch",
})``;

export const PixivIcon = (props: Omit<IconProps, "icon">) => {
  const {
    color = "black",
    size = 14,
    onClick = NO_OP,
    left = false,
    right = false,
  } = props;

  return (
    <IconWrapper onClick={onClick} left={left} right={right}>
      <StyledSvg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        size={size}
      >
        <path
          fill={color}
          d="M4.935 0A4.924 4.924 0 0 0 0 4.935v14.13A4.924 4.924 0 0 0 4.935 24h14.13A4.924 4.924 0 0 0 24 19.065V4.935A4.924 4.924 0 0 0 19.065 0zm7.81 4.547c2.181 0 4.058.676 5.399 1.847a6.118 6.118 0 0 1 2.116 4.66c.005 1.854-.88 3.476-2.257 4.563-1.375 1.092-3.225 1.697-5.258 1.697-2.314 0-4.46-.842-4.46-.842v2.718c.397.116 1.048.365.635.779H5.79c-.41-.41.19-.65.644-.779V7.666c-1.053.81-1.593 1.51-1.868 2.031.32 1.02-.284.969-.284.969l-1.09-1.73s3.868-4.39 9.553-4.39zm-.19.971c-1.423-.003-3.184.473-4.27 1.244v8.646c.988.487 2.484.832 4.26.832h.01c1.596 0 2.98-.593 3.93-1.533.952-.948 1.486-2.183 1.492-3.683-.005-1.54-.504-2.864-1.42-3.86-.918-.992-2.274-1.645-4.002-1.646Z"
        />
      </StyledSvg>
    </IconWrapper>
  );
};
