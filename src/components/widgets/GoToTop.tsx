import React from 'react'
import styled, { css } from 'styled-components'
import { UndoIcon } from '../../icons/FontAwesomeIcons'
import { boxShadow, gutter } from '../../styled/mixins'

const Wrapper = styled.div(
  (props: { $show: boolean }) => css`
    position: fixed;
    top: ${props.$show ? '0' : '-50px'};
    pointer-events: none;
    z-index: 500;
    display: flex;
    justify-content: center;
  `
)

const ScrollButton = styled.div(
  ({ theme }) => css`
    border-radius: 100px;
    ${boxShadow}
    background-color: ${theme.colors.accentColor};
    ${gutter}
  `
)

export default function GoToTop() {
  return (
    <Wrapper $show={true}>
      <ScrollButton>
        <UndoIcon />
      </ScrollButton>
    </Wrapper>
  )
}
