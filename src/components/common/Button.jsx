import React from "react";
import styled from "styled-components";
import { node, object, string } from "prop-types";
import {
  accentColor,
  backgroundColor,
  borderRadius,
  spacing,
  backgroundColor2,
  borderWidth
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

export default function Button({
  type,
  children,
  onClick,
  active,
  disabled,
  label
}) {
  let Btn;

  switch (type) {
    case "invisible":
      Btn = InvisibleButton;
      break;
    case "block":
      Btn = BlockButton;
      break;
    case "topLeft":
      Btn = TopLeftButton;
      break;
    case "modifier":
      Btn = ModifierButton;
      break;
    case "add":
      Btn = AddButton;
      break;
    case "menu":
      Btn = MenuButton;
      break;
    default:
      Btn = RedButton;
  }

  return (
    <Btn
      onClick={onClick}
      active={active}
      disabled={disabled}
      aria-label={label}
    >
      {children}
    </Btn>
  );
}

Button.propTypes = {
  type: string,
  children: node.isRequired,
  btnProps: object
};
