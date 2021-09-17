import React from 'react'
import styled from 'styled-components'
import ResetButton from '../widgets/ResetButton'
import outOfResultsPicture from '../../icons/OutOfResults.png'
import FlexImage from '../designsystem/FlexImage'
import { themes, defaultThemeId } from 'r34-branding'
import GlobalStyles from '../../GlobalStyles'

const FullScreenCentered = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
  align-content: center;
  padding: 30px;
  background: ${({ theme }) => theme.colors.backgroundColor};

  > * {
    margin-bottom: 10px;
  }
`

export default function ErrorScreen() {
  const theme = themes[defaultThemeId]

  return (
    <FullScreenCentered theme={theme}>
      <GlobalStyles theme={theme} />
      <FlexImage src={outOfResultsPicture} alt='Shironeko does not understand' />
      <h1>Sorry about that...</h1>
      <ResetButton theme={theme} />
    </FullScreenCentered>
  )
}
