import React from "react";
import styled, { css } from "styled-components";

const TextInput = styled.input(
  ({ theme }) => css`
    width: 50px;
    border: ${theme.dimensions.borderWidth} solid ${theme.colors.accentColor};
    background-color: ${theme.colors.backgroundColor2};
    padding: ${theme.dimensions.spacing};
    border-radius: ${theme.dimensions.borderRadius};
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
