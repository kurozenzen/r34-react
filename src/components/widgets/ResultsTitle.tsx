import React from 'react'
import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import { formatCount } from '../../misc/formatting'
import { selectCount } from '../../redux/selectors'
import { Title } from '../common/Text'

export default function ResultsTitle() {
  const [fullNumber, toggleFullNumber] = useToggle()
  const count = useSelector(selectCount)

  const formattedCount = fullNumber ? count.toLocaleString() : formatCount(count)

  return <Title onClick={toggleFullNumber}>{formattedCount} results</Title>
}
