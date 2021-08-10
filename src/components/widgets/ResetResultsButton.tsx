import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { UndoIcon } from '../../icons/FontAwesomeIcons'
import { setPosts } from '../../redux/actions'
import { BlockButton } from '../designsystem/Buttons'

export default function ResetResultsButton() {
  const dispatch = useDispatch()

  const handleClick = useCallback(() => dispatch(setPosts([], 0, 0)), [dispatch])

  return (
    <BlockButton onClick={handleClick}>
      <UndoIcon /> Reset Results
    </BlockButton>
  )
}
