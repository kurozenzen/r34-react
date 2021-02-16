import React, { MouseEventHandler } from "react";
import styled, { css } from "styled-components";
import {
  ButtonType,
  TOPLEFT,
  BLOCK,
  INVISIBLE,
  BOTTOMLEFT,
  CENTER,
  MODIFIER,
  ADD,
  MENU,
} from "../../data/types";

const BasicButton = styled.button(
  (props) => css`
    font-size: ${props.theme.fontSizes.content};

    :focus {
      outline: none;
    }
  `
);

const InvisibleButton = styled(BasicButton)(
  (props) => css`
    background-color: transparent;
    border: none;
    border-radius: 1000px;
    padding: 5px;
    filter: ${props.theme.shadow.drop};

    svg {
      transition: all 0.2s ease-in-out;
    }

    :hover {
      svg {
        transform: scale(1.1);
      }
    }
  `
);

const MenuButton = styled(InvisibleButton)(
  (props) => css`
    color: ${props.theme.colors.backgroundColor2};
  `
);

const ActiveMenuButton = styled(InvisibleButton)(
  (props) => css`
    color: ${props.theme.colors.accentColor};
  `
);

const TopLeftButton = styled(InvisibleButton)`
  position: relative;
  left: 0;
  top: 0;
  margin: 10px;
`;

const BottomLeftButton = styled(InvisibleButton)`
  position: relative;
  left: 0;
  bottom: 0;
  margin: 10px;
`;

const CenterButton = styled(InvisibleButton)`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const RedButton = styled(BasicButton)(
  (props) => css`
    height: 32px;
    font-size: ${props.theme.fontSizes.content};
    font-weight: bold;
    color: ${props.theme.colors.accentColor};
    background: ${props.theme.colors.backgroundColor};
    border: ${props.theme.colors.accentColor}
      ${props.theme.dimensions.borderWidth} solid;

    transition: border-color 0.4s ease-in-out;
    transition: color 0.4s ease-in-out;
    transition: background-color 0.4s ease-in-out;

    :hover {
      background-color: ${props.theme.colors.accentColor};
      color: ${props.theme.colors.backgroundColor};
    }

    :active,
    :focus {
      color: ${props.theme.colors.backgroundColor2};

      border-color: ${props.theme.colors.backgroundColor2};
      cursor: pointer;
    }
  `
);

export const BlockButton = styled(RedButton)(
  (props) => css`
    width: 100%;
    border-radius: ${props.theme.dimensions.borderRadius};
  `
);

export const AddButton = styled(RedButton)(
  (props) => css`
    border-left-width: 0;
    border-radius: 0 ${props.theme.dimensions.borderRadius}
      ${props.theme.dimensions.borderRadius} 0;
  `
);

export const ModifierButton = styled(BasicButton)(
  (props) => css`
    background-color: transparent;
    min-width: 48px;
    border: ${props.theme.colors.accentColor}
      ${props.theme.dimensions.borderWidth} solid;
    border-right-width: 0;
    border-radius: ${props.theme.dimensions.borderRadius} 0 0
      ${props.theme.dimensions.borderRadius};
    font-weight: bold;
  `
);

const getButtonByType = (type: ButtonType, active: boolean) => {
  switch (type) {
    case INVISIBLE:
      return InvisibleButton;
    case BLOCK:
      return BlockButton;
    case TOPLEFT:
      return TopLeftButton;
    case BOTTOMLEFT:
      return BottomLeftButton;
    case CENTER:
      return CenterButton;
    case MODIFIER:
      return ModifierButton;
    case ADD:
      return AddButton;
    case MENU:
      return active ? ActiveMenuButton : MenuButton;
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
