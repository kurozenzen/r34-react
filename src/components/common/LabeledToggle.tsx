import React, { MouseEventHandler } from "react";
import styled, { css } from "styled-components";
import Toggle from "./Toggle";

const ToggleWrapper = styled.label(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.dimensions.gutter};
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
      <span>{children}</span>
    </ToggleWrapper>
  );
}
