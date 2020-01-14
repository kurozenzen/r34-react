import styled from "styled-components";
import { gutter, layer, shadow, borderRadius } from "../../misc/style";

const Surface = styled.div`
  padding: ${gutter};
  background: ${layer};
  ${shadow};
  border-radius: ${borderRadius};

  > *:not(:last-child) {
    margin-bottom: ${gutter};
  }
`;

export default Surface;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${layer};
`;
