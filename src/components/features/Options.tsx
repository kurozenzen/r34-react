import { ChangeEventHandler, useCallback, useState } from 'react'
import styled from 'styled-components'
import LabeledToggle from '../designsystem/LabeledToggle'
import { PostsSort } from 'r34-types'
import usePreference from '../../hooks/usePreference'
import { flexRowWithGap, gridWithGap, PropsWithTheme } from '../../styled/mixins'
import Select from '../designsystem/Select'
import { SubtleInput } from '../designsystem/SubtleInput'

const OptionsWrapper = styled.div`
  ${gridWithGap}
`

const RatedRow = styled.div`
  ${flexRowWithGap}
`

const SortRow = styled.div`
  ${flexRowWithGap}
  height: ${({ theme }: PropsWithTheme) => theme.dimensions.blockHeight};
`

const sortOptions: Record<PostsSort, string> = {
  score: 'Score',
  date: 'Date',
}

export default function Options() {
  const [rated, setRated] = usePreference('rated')
  const [ratedThreshold, setRatedThreshold] = usePreference('ratedThreshold')
  const [sort, setSort] = usePreference('sort')

  const toggleRated = useCallback(() => setRated(!rated), [rated, setRated])

  const [ratedThresholdInternal, setRatedThresholdInternal] = useState(ratedThreshold ? ratedThreshold.toString() : '1')

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setRatedThresholdInternal(event.target.value),
    []
  )
  const onBlur = useCallback(
    () => setRatedThreshold(Number(ratedThresholdInternal)),
    [ratedThresholdInternal, setRatedThreshold]
  )

  const handleSubmit = useCallback((e) => {
    if (e.key === 'Enter') e.target.blur()
  }, [])

  const handleSortChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (event) => setSort(event.target.value as PostsSort),
    [setSort]
  )

  return (
    <OptionsWrapper data-testid='options-wrapper'>
      <LabeledToggle value={rated} onToggle={toggleRated}>
        {rated ? (
          <RatedRow>
            <span>More than</span>
            <SubtleInput
              type='number'
              value={ratedThresholdInternal}
              onChange={onChange}
              onBlur={onBlur}
              onKeyDown={handleSubmit}
            />
            <span>likes</span>
          </RatedRow>
        ) : (
          'Only show popular posts'
        )}
      </LabeledToggle>
      <SortRow>
        <span>Sort by:</span>
        <Select options={sortOptions} value={sort} onChange={handleSortChange} />
      </SortRow>
    </OptionsWrapper>
  )
}
