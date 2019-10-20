import React from "react";
import styled from "styled-components";
import { node, object, string } from "prop-types";
import { accentColor, backgroundColor, borderRadius } from "../../misc/style";

const InvisibleButton = styled.button`
  background: none;
  border: none;

  :focus {
    outline: none;
  }
`;

const TopLeftButton = styled(InvisibleButton)`
  position: absolute;
`;

const RedButton = styled.button`
  height: 32px;
  color: ${accentColor};
  background: ${backgroundColor};
  border: ${accentColor} thin solid;

  :hover {
    color: ${backgroundColor};
    background-color: ${accentColor};
    cursor: pointer;
  }
`;

const BlockButton = styled(RedButton)`
  width: 100%;
  border-radius: ${borderRadius};
`;

const AddButton = styled(RedButton)`
  border-radius: 0 ${borderRadius} ${borderRadius} 0;
`;

const ModifierButton = styled(InvisibleButton)`
  min-width: 48px;
`;

export default function Button({ type, children, onClick, disabled }) {
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
    default:
      Btn = RedButton;
  }

  return <Btn onClick={onClick}>{children}</Btn>;
}

Button.propTypes = {
  type: string,
  children: node.isRequired,
  btnProps: object
};
