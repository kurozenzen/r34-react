import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'
import { RedButton } from '../designsystem/Buttons'
import usePreference from '../../hooks/usePreference'

const CookieWrapper = styled.div(
  ({ theme }) => css`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${theme.colors.text};
    background: ${theme.colors.layerBgSolid};
    padding: ${theme.dimensions.gutter};
    z-index: 100;
  `
)

const StyledSpan = styled.span`
  height: min-content;
`

export default function CookieConfirmation() {
  const [cookies, setCookies] = usePreference('cookies')

  const handleAccept = useCallback(() => setCookies(true), [setCookies])

  return cookies ? null : (
    <CookieWrapper>
      <StyledSpan>This website uses cookies.</StyledSpan>
      <RedButton onClick={handleAccept} aria-label='Allow Cookies'>
        Okay
      </RedButton>
    </CookieWrapper>
  )
}
