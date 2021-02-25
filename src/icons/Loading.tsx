import React from "react"
import styled, { css } from "styled-components"

const StyledSvg = styled.svg(
  ({ theme }) => css`
    height: ${theme.dimensions.blockHeight};
    padding: ${theme.dimensions.bigSpacing};
  `
)

export default function Loading() {
  return (
    <StyledSvg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 50 20"
      enable-background="new 0 0 0 0"
      xmlSpace="preserve"
    >
      <circle fill="#fff" stroke="none" cx="6" cy="10" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
      </circle>
      <circle fill="#fff" stroke="none" cx="26" cy="10" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
      </circle>
      <circle fill="#fff" stroke="none" cx="46" cy="10" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
      </circle>
    </StyledSvg>
  )
}
