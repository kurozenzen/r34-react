import React from "react";
import Title from "../components/common/Title";
import { BlockButton } from "../components/common/Button";
import Surface, { Line } from "../components/common/Surface";

export default function Settings({ state, dispatch }) {
  return (
    <>
      <Title>Settings</Title>
      <Surface>
        <Title>General</Title>
        <p>nothing yet</p>
        <Line />
        <Title>Developer</Title>
        <BlockButton onClick={() => dispatch({ type: "RESET" })}>
          Reset Application
        </BlockButton>
      </Surface>
    </>
  );
}
