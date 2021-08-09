import React from 'react'
import useAction from '../../hooks/useAction'
import { SearchIcon } from '../../icons/FontAwesomeIcons'
import { getResults } from '../../redux/actions'
import { BlockButton } from '../designsystem/Buttons'

export default function SearchButton() {
  const search = useAction(getResults)

  return (
    <BlockButton onClick={search} aria-label='Search'>
      <SearchIcon />
      Search
    </BlockButton>
  )
}
