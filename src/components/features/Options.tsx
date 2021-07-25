import React, { ChangeEventHandler, useCallback, useState } from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import LabeledToggle from '../common/LabeledToggle'
import { PreferenceKey, SortType } from '../../data/types'
import usePreference from '../../hooks/usePreference'
import { borderRadius, flexRowWithGap, gridWithGap, PropsWithTheme } from '../../styled/mixins'
import Select from '../common/Select'

const OptionsWrapper = styled.div`
  ${gridWithGap}
`

const StyledInput = styled.input(
  (props: { value: string; theme: DefaultTheme }) => css`
    background: ${props.theme.colors.backgroundColor};
    padding: ${props.theme.dimensions.spacing};
    ${borderRadius}
    border: none;
    outline: none;
    color: ${props.theme.colors.accentColor};
    width: 3.4rem;
    text-align: right;
    font-size: ${props.theme.fontSizes.content};

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;
  `
)

const RatedRow = styled.div`
  ${flexRowWithGap}
`

const SortRow = styled.div`
  ${flexRowWithGap}
  height: ${({ theme }: PropsWithTheme) => theme.dimensions.blockHeight};
`

const sortOptions = {
  [SortType.SCORE]: 'Score',
  [SortType.DATE]: 'Date',
}

export default function Options() {
  const [rated, setRated] = usePreference(PreferenceKey.RATED)
  const [ratedThreshold, setRatedThreshold] = usePreference(PreferenceKey.RATED_THRESHOLD)
  const [sort, setSort] = usePreference(PreferenceKey.SORT)

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

  const handleSortChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (event) => setSort(event.target.value as SortType),
    [setSort]
  )

  return (
    <OptionsWrapper>
      <LabeledToggle value={rated} onToggle={toggleRated}>
        {rated ? (
          <RatedRow>
            <span>More than</span>
            <StyledInput type='text' value={ratedThresholdInternal} onChange={onChange} onBlur={onBlur} />
            <span>likes</span>
          </RatedRow>
        ) : (
          'Only show Rated Posts'
        )}
      </LabeledToggle>
      <SortRow>
        <span>Sort by:</span>
        <Select options={sortOptions} value={sort} onChange={handleSortChange} />
      </SortRow>
    </OptionsWrapper>
  )
}
