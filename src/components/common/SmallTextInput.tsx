import React from "react";
import styled, { css } from "styled-components";

const TextInput = styled.input(
  (props) => css`
    width: 50px;
    border: ${props.theme.dimensions.borderWidth} solid
      ${props.theme.colors.accentColor};
    background-color: ${props.theme.colors.backgroundColor2};
    padding: 3px;
    border-radius: 3px;
    text-align: right;
  `
);

interface SmallTextInputProps {
  type: string;
  value: string | number;
  onChange: (event: any) => void;
}

export default function SmallTextInput({
  type,
  value,
  onChange,
}: SmallTextInputProps) {
  return <TextInput type={type} value={value} onChange={onChange} />;
}
