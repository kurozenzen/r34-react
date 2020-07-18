import React, { MouseEventHandler } from "react";
import { bool, func, node } from "prop-types";
import styled, { css } from "styled-components";
import Toggle from "./Toggle";

const ToggleWrapper = styled.label`
  display: flex;
`;

const Label = styled.span(
  (props) => css`
    margin: auto;
    margin-left: ${props.theme.dimensions.gutter};
  `
);

interface LabeledToggleProps {
  children: JSX.Element | string;
  value: boolean;
  onToggle: MouseEventHandler;
}

export default function LabeledToggle(props: LabeledToggleProps) {
  const { children, value, onToggle } = props;

  return (
    <ToggleWrapper>
      <Toggle value={value} onToggle={onToggle} />
      <Label>{children}</Label>
    </ToggleWrapper>
  );
}

LabeledToggle.propTypes = {
  children: node.isRequired,
  value: bool.isRequired,
  onToggle: func.isRequired,
};
