import React, { MouseEventHandler } from "react";
import styled, { css } from "styled-components";
import { ButtonType, BLOCK, INVISIBLE, MODIFIER, ADD } from "../../data/types";

const BasicButton = styled.button(
  ({ theme }) => css`
    font-size: ${theme.fontSizes.content};
  `
);

const InvisibleButton = styled(BasicButton)(
  ({ theme }) => css`
    background-color: transparent;
    border: none;
    padding: ${theme.dimensions.spacing};
    filter: ${theme.shadow.drop};

    svg {
      transition: all ${theme.timings.transitionTime} ease-in-out;
    }

    :hover {
      svg {
        transform: scale(1.1);
      }
    }
  `
);

const RedButton = styled(BasicButton)(
  ({ theme }) => css`
    height: ${theme.dimensions.blockHeight};
    font-size: ${theme.fontSizes.content};
    color: ${theme.colors.accentColor};
    background: ${theme.colors.backgroundColor};
    border: ${theme.colors.accentColor} ${theme.dimensions.borderWidth} solid;
    border-radius: ${theme.dimensions.borderRadius};
    padding: 0 ${theme.dimensions.bigSpacing};

    transition: border-color ${theme.timings.longTransitionTime} ease-in-out;
    transition: color ${theme.timings.longTransitionTime} ease-in-out;
    transition: background-color ${theme.timings.longTransitionTime} ease-in-out;

    :hover {
      background-color: ${theme.colors.accentColor};
      color: ${theme.colors.backgroundColor};
    }

    :active,
    :focus {
      color: ${theme.colors.backgroundColor2};

      border-color: ${theme.colors.backgroundColor2};
      cursor: pointer;
    }
  `
);

export const BlockButton = styled(RedButton)(
  ({ theme }) => css`
    width: 100%;
  `
);

export const AddButton = styled(RedButton)(
  ({ theme }) => css`
    border-left-width: 0;
    border-radius: 0 ${theme.dimensions.borderRadius}
      ${theme.dimensions.borderRadius} 0;
  `
);

export const ModifierButton = styled(BasicButton)(
  ({ theme }) => css`
    background-color: transparent;
    min-width: 48px;
    border: ${theme.colors.accentColor} ${theme.dimensions.borderWidth} solid;
    border-right-width: 0;
    border-radius: ${theme.dimensions.borderRadius} 0 0
      ${theme.dimensions.borderRadius};
    font-weight: bold;
  `
);

const getButtonByType = (type: ButtonType, active: boolean) => {
  switch (type) {
    case INVISIBLE:
      return InvisibleButton;
    case BLOCK:
      return BlockButton;
    case MODIFIER:
      return ModifierButton;
    case ADD:
      return AddButton;
    default:
      return RedButton;
  }
};

interface ButtonProps {
  type: ButtonType;
  children: JSX.Element | string;
  onClick: MouseEventHandler;
  active?: boolean;
  disabled?: boolean;
  label: string;
  className?: string;
}

function Button(props: ButtonProps) {
  const {
    type,
    children,
    onClick,
    active = false,
    disabled = false,
    label,
    className = "",
  } = props;
  const TypedButton = getButtonByType(type, active);

  return (
    <TypedButton
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={className}
    >
      {children}
    </TypedButton>
  );
}

export default Button;
