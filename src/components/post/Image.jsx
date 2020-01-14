import React from "react";
import styled from "styled-components";

const FlexImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default function Image({ src, onClick }) {
  return (
    <FlexImage
      src={src}
      alt={src}
      onClick={onClick}
      onKeyDown={e => e.keyCode === 32 && onClick(e)}
    />
  );
}
