import React from "react";
import styled from "styled-components";
import { gutter } from "../../misc/style";
import Button from "../common/Button";

const FotterWrapper = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-around;
  padding: ${gutter};
`;

function Footer() {
  return (
    <FotterWrapper>
      <Button type="invisible">
        <a href="https://github.com/kurozenzen/r34-react">Github</a>
      </Button>
      <Button type="invisible">
        <a href="https://github.com/kurozenzen/r34-react/issues/new?template=bug_report.md">
          Report a bug
        </a>
      </Button>
      <Button type="invisible">
        <a href="https://github.com/kurozenzen/r34-react/issues/new?template=feature_request.md">
          Feature request
        </a>
      </Button>
    </FotterWrapper>
  );
}

export default Footer;
