import styled, { css } from "styled-components";

export const Title = styled.h2(
  ({ theme }) => css`
    font-size: ${theme.fontSizes.bigTitle};
    padding: ${theme.dimensions.spacing};
    font-weight: lighter;
    text-align: center;
  `
);

export const BigTitle = styled.h1(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    font-size: ${theme.fontSizes.bigTitle};
    font-weight: lighter;
    text-align: center;
  `
);

export const SmallTitle = styled.h3(
  (props) => css`
    font-size: ${props.theme.fontSizes.content};
  `
);
