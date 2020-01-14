import React from "react";
import { bool, func, node } from "prop-types";
import styled from "styled-components";
import ReactToggle from "react-toggle";
import "./Toggle.css";
import { gutter } from "../../misc/style";

const ToggleWrapper = styled.label`
  display: flex;
`;

const Label = styled.span`
  margin-left: ${gutter};
`;

export default function Toggle({ children, initial, onChange }) {
  return (
    <ToggleWrapper>
      <ReactToggle
        defaultChecked={initial}
        icons={{
          checked: null,
          unchecked: null
        }}
        onChange={onChange}
      />
      <Label>{children}</Label>
    </ToggleWrapper>
  );
}

Toggle.propTypes = {
  children: node.isRequired,
  initial: bool,
  onChange: func.isRequired
};

Toggle.defaultProps = {
  initial: false
};
