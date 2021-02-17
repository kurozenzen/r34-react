import styled, { css } from "styled-components";

export default styled.h2`
  font-size: 24px;
  font-weight: lighter;
  text-align: center;
`;

export const BigTitle = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: lighter;
  text-align: center;
`;

export const SmallTitle = styled.h3(
  (props) => css`
    font-size: ${props.theme.fontSizes.content};
  `
);
