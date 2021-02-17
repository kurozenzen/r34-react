import React from "react";
import styled, { css } from "styled-components";

interface IconAndTextProps {
  children: [JSX.Element, JSX.Element];
}

const Wrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.dimensions.spacing};
  `
);

export default function IconAndText({ children }: IconAndTextProps) {
  return <Wrapper>{children}</Wrapper>;
}
