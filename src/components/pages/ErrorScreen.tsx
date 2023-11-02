import React from 'react'
import styled from 'styled-components'
import ResetButton from '../widgets/ResetButton'
import outOfResultsPicture from '../../icons/OutOfResults.png'
import FlexImage from '../designsystem/FlexImage'
import { themes, defaultThemeId } from 'r34-branding'
import GlobalStyles from '../../GlobalStyles'
import { BlockButton } from '../designsystem/Buttons'
import { UndoIcon } from '../../icons/FontAwesomeIcons'

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
      <FlexImage src={outOfResultsPicture} alt='Cute image to make unexpected crash more bearable' />
      <h1>Sorry about that...</h1>
      <p>A page reload might help:</p>
      <BlockButton onClick={() => window.location.reload()}>
        <UndoIcon /> Reload
      </BlockButton>
      <p>If the issue persists try resetting the app</p>
      <ResetButton theme={theme} />
    </FullScreenCentered>
  )
}
