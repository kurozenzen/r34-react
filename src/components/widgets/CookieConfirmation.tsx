import React from 'react'
import styled, { css } from 'styled-components'
import { RedButton } from '../common/Buttons'
import { useSelector } from 'react-redux'
import { allowCookiesAction } from '../../redux/actions'
import { selectCookies } from '../../redux/selectors'
import useAction from '../../hooks/useAction'

const CookieWrapper = styled.div(
  ({ theme }) => css`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${theme.colors.backgroundColor2};
    background: ${theme.colors.layerBgSolid};
    padding: ${theme.dimensions.gutter};
  `
)

const StyledSpan = styled.span`
  height: min-content;
`

export default function CookieConfirmation() {
  const cookies = useSelector(selectCookies)
  const onClick = useAction(allowCookiesAction)

  return cookies ? null : (
    <CookieWrapper>
      <StyledSpan>This website uses cookies.</StyledSpan>
      <RedButton onClick={onClick} aria-label='Allow Cookies'>
        Got it
      </RedButton>
    </CookieWrapper>
  )
}
