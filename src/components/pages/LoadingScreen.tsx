import React from 'react'
import styled from 'styled-components'
import Loading from '../../icons/Loading'

const FullScreenCentered = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  background: black;
`

export default function LoadingScreen() {
  return (
    <FullScreenCentered>
      <Loading />
    </FullScreenCentered>
  )
}
