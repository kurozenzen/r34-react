import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { ExpandIcon, CloseIcon } from '../../icons/FontAwesomeIcons'
import { exitFullscreen, enterFullscreen } from '../../redux/actions'
import { selectFullsceenState } from '../../redux/selectors'
import { dropShadow } from '../../styled/mixins'

const ExpandButton = styled(ExpandIcon)(
  ({ theme }) => css`
    grid-area: 1/1/2/2;
    place-self: start start;
    ${dropShadow}
    margin: ${theme.dimensions.gutter};
    cursor: pointer;
  `
)

const CloseButton = styled(CloseIcon)(
  ({ theme }) => css`
    grid-area: 1/1/2/2;
    place-self: start start;
    ${dropShadow}
    margin: ${theme.dimensions.gutter};
    cursor: pointer;
  `
)

interface ToggleFullscreenButtonProps {
  index: number
}

export default function ToggleFullscreenButton(props: ToggleFullscreenButtonProps) {
  const { index } = props

  const dispatch = useDispatch()
  const isInFullscreen = useSelector(selectFullsceenState)

  const onFullscreenExit = React.useCallback<React.MouseEventHandler>(
    (event) => {
      event.stopPropagation()
      dispatch(exitFullscreen())
    },
    [dispatch]
  )

  const onFullscreenEnter = React.useCallback<React.MouseEventHandler>(
    (event) => {
      event.stopPropagation()
      dispatch(enterFullscreen(index))
    },
    [dispatch, index]
  )

  return isInFullscreen ? (
    <CloseButton color='white' onClick={onFullscreenExit} aria-label='Exit fullscreen' title='Exit fullscreen' />
  ) : (
    <ExpandButton color='white' onClick={onFullscreenEnter} aria-label='Enter fullscreen' title='Enter fullscreen' />
  )
}
