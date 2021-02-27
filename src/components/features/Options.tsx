import React, { ChangeEventHandler, useCallback, useState } from 'react'
import styled, { css } from 'styled-components'
import LabeledToggle from '../common/LabeledToggle'
import { ThemeType } from '../../misc/theme'
import { PreferenceKey } from '../../data/types'
import usePreference from '../../hooks/usePreference'

const OptionsWrapper = styled.div(
  ({ theme }) => css`
    display: grid;
    gap: ${theme.dimensions.gutter};
  `
)

const StyledInput = styled.input(
  (props: { value: string; theme: ThemeType }) => css`
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

export default function Options() {
  const [rated, setRated] = usePreference(PreferenceKey.RATED)
  const [ratedTreshold, setRatedThreshold] = usePreference(PreferenceKey.RATEDTRESHOLD)
  const toggleRated = useCallback(() => setRated(!rated), [rated, setRated])

  const [ratedTresholdInternal, setRatedThresholdInternal] = useState(ratedTreshold.toString())

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setRatedThresholdInternal(event.target.value),
    []
  )
  const onBlur = useCallback(() => setRatedThreshold(Number(ratedTresholdInternal)), [
    ratedTresholdInternal,
    setRatedThreshold,
  ])

  return (
    <OptionsWrapper>
      <LabeledToggle value={rated} onToggle={toggleRated}>
        {rated ? (
          <div style={{ display: 'flex' }}>
            <span>More than</span>
            <StyledInput type='text' value={ratedTresholdInternal} onChange={onChange} onBlur={onBlur} />
            <span>likes</span>
          </div>
        ) : (
          'Only show Rated Posts'
        )}
      </LabeledToggle>
    </OptionsWrapper>
  )
}
