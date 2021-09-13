import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'
import useAction from '../../hooks/useAction'
import { closeModal } from '../../redux/actions'
import { flexColumnWithGap, fullscreenOverlay } from '../../styled/mixins/layout'
import { ZIndex } from '../../styled/zIndex'
import { SolidSurface } from './Surface'

const Wrapper = styled.div(
  ({ theme }) => css`
    display: grid;
    place-items: center;
    ${fullscreenOverlay}
    z-index: ${ZIndex.MODAL};
    padding: ${theme.dimensions.hugeSpacing};
    background: ${theme.colors.backdrop};
  `
)

const ModalSurface = styled(SolidSurface)(
  ({ theme }) => css`
    ${flexColumnWithGap}
    max-width: ${theme.dimensions.modalWidth};
    max-height: 100vh;
    overflow-y: auto;
    overscroll-behavior: none;
  `
)

interface ModalProps {
  children: React.ReactNode
}

export default function Modal(props: ModalProps) {
  const { children } = props

  const close = useAction(closeModal)
  const blockEvent = useCallback((e) => e.stopPropagation(), [])

  return (
    <Wrapper onClick={close} title='Close modal'>
      <ModalSurface onClick={blockEvent} title=''>
        {children}
      </ModalSurface>
    </Wrapper>
  )
}
