import React, { useCallback } from 'react'
import styled from 'styled-components'
import useAction from '../../hooks/useAction'
import { closeModal } from '../../redux/actions'
import Surface from './Surface'

const Wrapper = styled.div`
  position: fixed;
  display: grid;
  place-items: center;

  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 20px;

  z-index: 1000;

  background: #000000d0;
`

const ModalSurface = styled(Surface)`
  max-width: 500px;
  background-color: ${(props) => props.theme.colors.layerBgSolid};
`

interface ModalProps {
  children: React.ReactNode
}

export default function Modal(props: ModalProps) {
  const { children } = props

  const close = useAction(closeModal)
  const blockEvent = useCallback((e) => e.stopPropagation(), [])

  return (
    <Wrapper onClick={close} title='Close modal'>
      <ModalSurface onClick={blockEvent}>{children}</ModalSurface>
    </Wrapper>
  )
}
