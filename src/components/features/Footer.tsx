import React from "react";
import styled, { css } from "styled-components";

const FotterWrapper = styled.footer(
  (props) => css`
    display: grid;
    grid-template-columns: 1fr 1px 1fr 1px 1fr;
    justify-content: space-around;
    padding: ${props.theme.dimensions.spacing};
  `
);

const Divider = styled.div(
  (props) => css`
    width: 1px;
    height: 20px;
    background: ${props.theme.colors.backgroundColor2};
  `
);

const CenteredA = styled.a`
  text-align: center;
`;

export default function Footer() {
  return (
    <FotterWrapper>
      <CenteredA href="https://github.com/kurozenzen/r34-react/issues/new?template=bug_report.md">
        Report a bug
      </CenteredA>
      <Divider />
      <CenteredA href="https://github.com/kurozenzen/r34-react">
        Github
      </CenteredA>
      <Divider />
      <CenteredA href="https://github.com/kurozenzen/r34-react/issues/new?template=feature_request.md">
        Feature request
      </CenteredA>
    </FotterWrapper>
  );
}
