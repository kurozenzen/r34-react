import React from "react";
import styled from "styled-components";
import { string, func } from "prop-types";
import { accentColor, borderWidth } from "../../misc/style";

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: none;
  font-size: 14px;
  border-top: ${accentColor} ${borderWidth} solid;
  border-bottom: ${accentColor} ${borderWidth} solid;
`;

export default function TagInput({ value, setValue }) {
  return (
    <Input
      id="tag-input"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Search for tags"
      aria-label="Search"
    />
  );
}

TagInput.propTypes = {
  value: string,
  setValue: func
};
