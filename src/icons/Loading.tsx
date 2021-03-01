import React from 'react'
import styled from 'styled-components'

// Don't use theme here so the loadingScreen is independent
const StyledSvg = styled.svg`
  height: 32px;
  padding: 8px;
`

export default function Loading() {
  return (
    <StyledSvg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 50 20'
      enable-background='new 0 0 0 0'
      xmlSpace='preserve'
    >
      <circle fill='#fff' stroke='none' cx='6' cy='10' r='6'>
        <animate attributeName='opacity' dur='1s' values='0;1;0' repeatCount='indefinite' begin='0.1' />
      </circle>
      <circle fill='#fff' stroke='none' cx='25' cy='10' r='6'>
        <animate attributeName='opacity' dur='1s' values='0;1;0' repeatCount='indefinite' begin='0.2' />
      </circle>
      <circle fill='#fff' stroke='none' cx='44' cy='10' r='6'>
        <animate attributeName='opacity' dur='1s' values='0;1;0' repeatCount='indefinite' begin='0.3' />
      </circle>
    </StyledSvg>
  )
}
