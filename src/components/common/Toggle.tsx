import React, { MouseEventHandler } from "react";
import styled, { css, keyframes } from "styled-components";
import { ThemeType } from "../../misc/theme";

const Wrapper = styled.div(
  (props) => css`
    border-radius: 30px;
    width: 50px;
    border: ${props.theme.dimensions.borderWidth} solid
      ${props.theme.colors.accentColor};
    background-color: ${props.theme.colors.backgroundColor};
    transition: transform 0.4s ease-in-out;
  `
);

const Thumb = styled.div(
  (props: { value: boolean; theme: ThemeType }) => css`
    width: 20px;
    height: 20px;
    background-color: ${props.value
      ? props.theme.colors.accentColor
      : props.theme.colors.backgroundColor2};
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    transform: translate(${props.value ? "30px" : "0px"});
  `
);

interface ToggleProps {
  value: boolean;
  onToggle: MouseEventHandler;
}

export default function Toggle(props: ToggleProps) {
  const { value, onToggle } = props;

  return (
    <Wrapper onClick={onToggle}>
      <Thumb value={value} />
    </Wrapper>
  );
}
