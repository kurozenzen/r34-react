import React from "react";
import styled from "styled-components";
import { node, object, string } from "prop-types";
import {
  accentColor,
  backgroundColor,
  borderRadius,
  spacing,
  backgroundColor2,
  borderWidth,
  dropShadow,
} from "../../misc/style";

const BasicButton = styled.button`
  font-size: 14px;

  :focus {
    outline: none;
  }
`;

const InvisibleButton = styled(BasicButton)`
  background: none;
  border: none;
  padding: ${spacing};

  :focus {
    text-decoration: underline;
  }
`;

const MenuButton = styled(InvisibleButton)`
  color: ${({ active }) => (active ? accentColor : backgroundColor2)};
`;

const TopLeftButton = styled(InvisibleButton)`
  position: absolute;
  left: 0;
  top: 0;
  margin: 10px;
  padding: 5px 5px;
  filter: ${dropShadow};
`;

const BottomLeftButton = styled(InvisibleButton)`
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 10px;
  padding: 5px 5px;
  filter: ${dropShadow};
`;

const CenterButton = styled(InvisibleButton)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  filter: ${dropShadow};
`;

const RedButton = styled(BasicButton)`
  height: 32px;
  font-size: 14px;
  color: ${accentColor};
  background: ${backgroundColor};
  border: ${accentColor} ${borderWidth} solid;

  transition: border-color 0.4s ease-in-out;
  transition: color 0.4s ease-in-out;
  transition: background-color 0.4s ease-in-out;

  :hover {
    background-color: ${accentColor};
    color: ${backgroundColor};
  }

  :active,
  :focus {
    color: ${backgroundColor2};

    border-color: ${backgroundColor2};
    cursor: pointer;
  }
`;

export const BlockButton = styled(RedButton)`
  width: 100%;
  border-radius: ${borderRadius};
`;

export const AddButton = styled(RedButton)`
  border-left-width: 0;
  border-radius: 0 ${borderRadius} ${borderRadius} 0;
`;

export const ModifierButton = styled(InvisibleButton)`
  min-width: 48px;
  border: ${accentColor} ${borderWidth} solid;
  border-right-width: 0;
  border-radius: ${borderRadius} 0 0 ${borderRadius};
`;

/**
 * @param {String} type
 */
const getButtonByType = (type) => {
  switch (type) {
    case "invisible":
      return InvisibleButton;
    case "block":
      return BlockButton;
    case "topLeft":
      return TopLeftButton;
    case "bottomLeft":
      return BottomLeftButton;
    case "center":
      return CenterButton;
    case "modifier":
      return ModifierButton;
    case "add":
      return AddButton;
    case "menu":
      return MenuButton;
    default:
      return RedButton;
  }
};

export default function Button({
  type,
  children,
  onClick,
  active,
  disabled,
  label,
}) {
  const TypedButton = getButtonByType(type);

  return (
    <TypedButton
      onClick={onClick}
      active={active}
      disabled={disabled}
      aria-label={label}
    >
      {children}
    </TypedButton>
  );
}

Button.propTypes = {
  type: string,
  children: node.isRequired,
  btnProps: object,
};
