import React from 'react'
import LayoutElementProps from './LayoutElementProps'
import LoadingIcon from '../../icons/Loading'
import styled from 'styled-components'
import { NO_OP } from '../../data/types'

const Wrapper = styled.div`
  display: grid;
  place-items: center;
`

export default function LayoutLoadingItem({ onLoad = NO_OP, virtualRef, style }: LayoutElementProps) {
  return (
    <Wrapper onLoad={onLoad} ref={virtualRef} style={style} role='row'>
      <LoadingIcon />
    </Wrapper>
  )
}
