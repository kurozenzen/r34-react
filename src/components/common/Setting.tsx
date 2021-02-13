import React from "react";
import styled from "styled-components";
import { SmallTitle } from "./Title";

const SettingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;

  > h3 {
    grid-column: 1/2;
    grid-row: 1/2;
  }

  > p {
    grid-column: 1/2;
    grid-row: 2/3;
  }

  > :nth-child(3) {
    grid-column: 2/3;
    grid-row: 1/3;
  }
`;

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
      <SmallTitle>{title}</SmallTitle>
      <p>{description}</p>
      <div>{children}</div>
    </SettingGrid>
  );
}
