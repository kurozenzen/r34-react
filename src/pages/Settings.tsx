import React from "react";
import { useDispatch } from "react-redux";
import { BlockButton } from "../components/common/Button";
import Surface, { Line } from "../components/common/Surface";
import Title from "../components/common/Title";
import { reset } from "../redux/actions";

export default function Settings() {
  const dispatch = useDispatch();

  return (
    <>
      <Title>Settings</Title>
      <Surface>
        <Title>General</Title>
        <p>nothing yet</p>
        <Line />
        <Title>Developer</Title>
        <BlockButton onClick={() => dispatch(reset())}>
          Reset Application
        </BlockButton>
      </Surface>
    </>
  );
}
