import { PostsSort } from 'r34-types'
import React from 'react'
import styled from 'styled-components'
import usePreference from '../../hooks/usePreference'
import { flexRowWithGap } from '../../styled/mixins/layout'
import { PropsWithTheme } from '../../styled/mixins/types'
import Select from '../designsystem/Select'

const SortRow = styled.div`
  ${flexRowWithGap}
  height: ${({ theme }: PropsWithTheme) => theme.dimensions.blockHeight};
`

const sortOptions = {
  'score:desc': 'Score',
  'date:desc': 'Date',
}

export default function SortSelect() {
  const [sort, setSort] = usePreference('sort')

  const handleSortChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    (event) => setSort(event.target.value as PostsSort),
    [setSort]
  )

  return (
    <SortRow>
      <span>Sort by:</span>
      <Select options={sortOptions} value={sort} onChange={handleSortChange} />
    </SortRow>
  )
}
