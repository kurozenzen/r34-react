import React from 'react'
import styled from 'styled-components'
import Loading from '../../icons/Loading'

const FullScreenCentered = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
`

export default function LoadingScreen() {
  return (
    <FullScreenCentered>
      <Loading />
    </FullScreenCentered>
  )
}
