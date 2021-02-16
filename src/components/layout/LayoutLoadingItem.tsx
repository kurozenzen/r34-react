import React from "react";
import LayoutElementProps from "./LayoutElementProps";
import LoadingIcon from "../../icons/Loading";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  place-items: center;
`;

export default function LayoutLoadingItem({
  onLoad,
  virtualRef,
  style,
}: LayoutElementProps) {
  return (
    <Wrapper onLoad={onLoad} ref={virtualRef} style={style} role="row">
      <LoadingIcon />
    </Wrapper>
  );
}
