import styled, { css } from "styled-components";

export default styled.div(
  (props) => css`
    padding: ${props.theme.dimensions.gutter};
    background: ${props.theme.misc.layer};
    ${props.theme.shadow.box};
    border-radius: ${props.theme.dimensions.borderRadius};
    width: calc(100% - 20px);
    max-width: 1000px;

    > *:not(:last-child) {
      margin-bottom: ${props.theme.dimensions.gutter};
    }
  `
);

export const Line = styled.div(
  (props) => css`
    width: 100%;
    height: 1px;
    background: ${props.theme.misc.layer};
  `
);
