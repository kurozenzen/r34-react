import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCount } from '../../redux/selectors'
import SearchEditor from '../features/SearchEditor'
import Header from '../features/Header'
import LayoutElementProps from './LayoutElementProps'
import { NO_OP } from '../../data/types'
import SearchPlaceholder from '../widgets/SearchPlaceholder'
import ResultsTitle from '../widgets/ResultsTitle'

export default function LayoutHeader({ onLoad = NO_OP, virtualRef, style }: LayoutElementProps) {
  const count = useSelector(selectCount)

  // Trigger load event when count is > 0
  // This is used to re-measure the element
  useEffect(() => {
    count > 0 && onLoad()
  }, [count, onLoad])

  return (
    <div onLoad={onLoad} ref={virtualRef} style={style} role='row'>
      <Header />
      <SearchEditor onLoad={onLoad} />
      {count > 0 ? <ResultsTitle /> : <SearchPlaceholder />}
    </div>
  )
}
