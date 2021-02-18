import React from "react";
import styled, { css } from "styled-components";
import { SmallTitle } from "./Text";

const Grid = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    gap: ${theme.dimensions.spacing};
  `
);

const Title = styled(SmallTitle)(
  ({ theme }) => css`
    grid-column: 1/2;
    grid-row: 1/2;
  `
);

const Body = styled.p(
  ({ theme }) => css`
    grid-column: 1/2;
    grid-row: 2/3;
    opacity: 0.5;
  `
);

const Control = styled.div(
  ({ theme }) => css`
    grid-column: 2/3;
    grid-row: 1/3;
  `
);

interface SettingProps {
  title: string;
  description: string;
  children: JSX.Element;
}

export default function Setting({
  title,
  description,
  children,
}: SettingProps) {
  return (
    <Grid>
      <Title>{title}</Title>
      <Body>{description}</Body>
      <Control>{children}</Control>
    </Grid>
  );
}
