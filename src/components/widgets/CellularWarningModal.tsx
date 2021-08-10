import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { RouteName } from '../../data/types'
import useAction from '../../hooks/useAction'
import { closeModal, getResults } from '../../redux/actions'
import Modal from '../designsystem/Modal'
import eeek from '../../icons/eeek.png'
import FlexImage from '../designsystem/FlexImage'
import { Faded, Title } from '../designsystem/Text'
import { flexRowWithGap } from '../../styled/mixins'
import { RedButton } from '../designsystem/Buttons'
import styled from 'styled-components'
import { FailedIcon, SuccessIcon } from '../../icons/FontAwesomeIcons'
import LabeledToggle from '../designsystem/LabeledToggle'
import usePreference from '../../hooks/usePreference'

const ButtonRow = styled.div`
  ${flexRowWithGap}

  > button {
    flex-grow: 1;
  }
`

export default function CellularWarningModal() {
  const close = useAction(closeModal)
  const search = useAction(getResults)
  const history = useHistory()

  const onConfirm = useCallback(() => {
    history.push({ pathname: RouteName.SEARCH, hash: 'results' })
    search()
    close()
  }, [close, history, search])

  const onCancel = useCallback(() => {
    close()
  }, [close])

  const [autoPlay, setAutoPlay] = usePreference('autoPlay')
  const toggleAutoPlay = useCallback(() => setAutoPlay(!autoPlay), [autoPlay, setAutoPlay])
  const [preloadVideos, setPreloadVideos] = usePreference('preloadVideos')
  const togglePreloadVideos = useCallback(() => setPreloadVideos(!preloadVideos), [preloadVideos, setPreloadVideos])
  const [originals, setOriginals] = usePreference('originals')
  const toggleOriginals = useCallback(() => setOriginals(!originals), [originals, setOriginals])

  return (
    <Modal>
      <FlexImage src={eeek} />
      <Title>Wait!</Title>
      <Faded>
        You are on cellular and have some features enabled that will consume a lot of data. Are you sure this is
        intended?
      </Faded>
      <LabeledToggle value={autoPlay} onToggle={toggleAutoPlay}>
        Auto-play Animations
      </LabeledToggle>
      <LabeledToggle value={preloadVideos} onToggle={togglePreloadVideos}>
        Preload Animations
      </LabeledToggle>
      <LabeledToggle value={originals} onToggle={toggleOriginals}>
        Load original sizes
      </LabeledToggle>
      <ButtonRow>
        <RedButton onClick={onConfirm}>
          <SuccessIcon /> Yes
        </RedButton>
        <RedButton onClick={onCancel}>
          <FailedIcon /> No
        </RedButton>
      </ButtonRow>
    </Modal>
  )
}
