import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import { formatCount } from '../../misc/formatting'
import { selectCount } from '../../redux/selectors'
import { Title } from '../designsystem/Text'

const ClickableTitle = styled(Title)`
  cursor: pointer;
`

export default function ResultsTitle() {
  const [fullNumber, toggleFullNumber] = useToggle()
  const count = useSelector(selectCount)

  const formattedCount = fullNumber ? count.toLocaleString() : formatCount(count)

  return (
    <ClickableTitle id='results' onClick={toggleFullNumber}>
      {formattedCount} results
    </ClickableTitle>
  )
}
