import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { RouteName } from '../../data/types'
import { ExpandIcon, CloseIcon } from '../../icons/FontAwesomeIcons'
import { scrollToPost, setFullscreenPost } from '../../redux/actions'
import { dropShadow } from '../../styled/mixins/shadow'
import { InvisButton } from '../designsystem/Buttons'

const ToggleButton = styled(InvisButton)(
  ({ theme }) => css`
    grid-area: 1/1/2/2;
    place-self: start start;
    ${dropShadow}
    padding: ${theme.dimensions.bigSpacing};
    cursor: pointer;
  `
)

interface ToggleFullscreenButtonProps {
  index: number
}

export default function ToggleFullscreenButton(props: ToggleFullscreenButtonProps) {
  const { index } = props

  const dispatch = useDispatch()
  const history = useHistory()

  const onFullscreenExit = React.useCallback<React.MouseEventHandler>(
    (event) => {
      event.stopPropagation()
      history.goBack()
      dispatch(scrollToPost(index))
    },
    [dispatch, history, index]
  )

  const onFullscreenEnter = React.useCallback<React.MouseEventHandler>(
    (event) => {
      event.stopPropagation()
      dispatch(setFullscreenPost(index))
      history.push(RouteName.STORIES)
    },
    [dispatch, history, index]
  )

  return history.location.pathname === RouteName.STORIES ? (
    <ToggleButton onClick={onFullscreenExit} aria-label='Exit fullscreen' title='Exit fullscreen'>
      <CloseIcon color='white' />
    </ToggleButton>
  ) : (
    <ToggleButton onClick={onFullscreenEnter} aria-label='Enter fullscreen' title='Enter fullscreen'>
      <ExpandIcon color='white' />
    </ToggleButton>
  )
}
