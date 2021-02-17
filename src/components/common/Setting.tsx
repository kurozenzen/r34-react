import React from "react";
import styled, { css } from "styled-components";
import { SmallTitle } from "./Title";

const SettingGrid = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    gap: ${theme.dimensions.spacing};
  `
);

const SettingTitle = styled(SmallTitle)(
  ({ theme }) => css`
    grid-column: 1/2;
    grid-row: 1/2;
  `
);

const SettingBody = styled.p(
  ({ theme }) => css`
    grid-column: 1/2;
    grid-row: 2/3;
    opacity: 0.5;
  `
);

const SettingControl = styled.div(
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
    <SettingGrid>
      <SettingTitle>{title}</SettingTitle>
      <SettingBody>{description}</SettingBody>
      <SettingControl>{children}</SettingControl>
    </SettingGrid>
  );
}
