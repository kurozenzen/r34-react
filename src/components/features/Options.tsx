import React, { ChangeEventHandler, useCallback, useState } from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import LabeledToggle from '../common/LabeledToggle'
import { PreferenceKey } from '../../data/types'
import usePreference from '../../hooks/usePreference'
import { flexRowWithGap, gridWithGap, PropsWithTheme } from '../../styled/mixins'
import Select from '../common/Select'

const OptionsWrapper = styled.div`
  ${gridWithGap}
`

const StyledInput = styled.input(
  (props: { value: string; theme: DefaultTheme }) => css`
    background: none;
    border: none;
    outline: none;
    color: ${props.theme.colors.accentColor};
    width: ${0.65 * props.value.length}em;
    text-align: right;
    font-size: ${props.theme.fontSizes.content};
    margin: -1px 0.2em 0 0.2em;

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;
  `
)

const SortRow = styled.div`
  ${flexRowWithGap}
  height: ${({ theme }: PropsWithTheme) => theme.dimensions.blockHeight};
`

const sortOptions = {
  score: 'Score',
  date: 'Date',
}

export default function Options() {
  const [rated, setRated] = usePreference(PreferenceKey.RATED)
  const [ratedThreshold, setRatedThreshold] = usePreference(PreferenceKey.RATEDThreshold)
  const [sort, setSort] = usePreference(PreferenceKey.SORT)

  const toggleRated = useCallback(() => setRated(!rated), [rated, setRated])

  const [ratedThresholdInternal, setRatedThresholdInternal] = useState(ratedThreshold ? ratedThreshold.toString() : '1')

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setRatedThresholdInternal(event.target.value),
    []
  )
  const onBlur = useCallback(() => setRatedThreshold(Number(ratedThresholdInternal)), [
    ratedThresholdInternal,
    setRatedThreshold,
  ])

  const handleSortChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (event) => setSort(event.target.value as 'score' | 'date'),
    [setSort]
  )

  return (
    <OptionsWrapper>
      <LabeledToggle value={rated} onToggle={toggleRated}>
        {rated ? (
          <div style={{ display: 'flex' }}>
            <span>More than</span>
            <StyledInput type='text' value={ratedThresholdInternal} onChange={onChange} onBlur={onBlur} />
            <span>likes</span>
          </div>
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
