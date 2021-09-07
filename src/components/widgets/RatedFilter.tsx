import React from 'react'
import styled from 'styled-components'
import usePreference from '../../hooks/usePreference'
import { flexRowWithGap } from '../../styled/mixins/layout'
import LabeledToggle from '../designsystem/LabeledToggle'
import { SubtleInput } from '../designsystem/SubtleInput'

const RatedRow = styled.div`
  ${flexRowWithGap}
`

const RatedToggle = styled(LabeledToggle)`
  height: 28px; // prevent layout shift when toggling
`

export default function RatedFilter() {
  const [rated, setRated] = usePreference('rated')
  const [ratedThreshold, setRatedThreshold] = usePreference('ratedThreshold')

  const toggleRated = React.useCallback(() => setRated(!rated), [rated, setRated])

  const [ratedThresholdInternal, setRatedThresholdInternal] = React.useState(
    ratedThreshold ? ratedThreshold.toString() : '1'
  )

  const onChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    (event) => setRatedThresholdInternal(event.target.value),
    []
  )

  const onBlur = React.useCallback(
    () => setRatedThreshold(Number(ratedThresholdInternal)),
    [ratedThresholdInternal, setRatedThreshold]
  )

  const handleSubmit = React.useCallback((e) => {
    if (e.key === 'Enter') e.target.blur()
  }, [])

  return (
    <RatedToggle value={rated} onToggle={toggleRated}>
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
    </RatedToggle>
  )
}
