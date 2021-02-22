import React from "react";
import styled, { css } from "styled-components";
import { Modifier } from "../../data/types";
import TagName from "./TagName";

interface AliasProps {
  modifier: Modifier;
  name: string;
  count?: number | null;
}

const AliasWrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    padding: 0 ${theme.dimensions.bigSpacing};
    gap: ${theme.dimensions.spacing};
    align-items: center;
    height: ${theme.dimensions.blockHeight};
    font-size: ${theme.fontSizes.content};
  `
);

export default function Alias(props: AliasProps) {
  const { modifier, name, count } = props;

  return (
    <AliasWrapper>
      <TagName modifier={modifier} name={name} count={count} />
    </AliasWrapper>
  );
}
