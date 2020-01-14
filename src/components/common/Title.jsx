import React from "react";
import { oneOf, node } from "prop-types";
import styled from "styled-components";

const BigTitle = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: lighter;
  text-align: center;
  margin: 0;
`;

const MediumTitle = styled.h2`
  font-size: 24px;
  font-weight: lighter;
  margin: 0;
  text-align: center;
`;

function Title({ size, children }) {
  switch (size) {
    case "large":
      return <BigTitle>{children}</BigTitle>;
    case "medium":
    default:
      return <MediumTitle>{children}</MediumTitle>;
  }
}

Title.propTypes = {
  size: oneOf(["large", "medium", "small"]),
  children: node
};

export default Title;
