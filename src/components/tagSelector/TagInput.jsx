import React from "react";
import styled from "styled-components";
import { string, func } from "prop-types";

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: none;
`;

export default function TagInput({ value, setValue }) {
  return (
    <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Search for tags"
    />
  );
}

TagInput.propTypes = {
  value: string,
  setValue: func
};
