import React from 'react'
import styled from 'styled-components'
import {
  supportsAspectRatio,
  supportsFlexGap,
  supportsFullscreen,
  supportsGap,
  supportsObjectFit,
} from '../../data/browserUtils'
import { flexColumnWithGap, gutter, borderRadius } from '../../styled/mixins'
import StatusImage from '../common/StatusImage'
import { SmallTitle, Faded } from '../common/Text'

const Wrapper = styled.div`
  ${flexColumnWithGap}
`

const FeatureList = styled.div`
  ${flexColumnWithGap}
  ${gutter}
  ${borderRadius}
  background: ${(props) => props.theme.colors.backgroundColor};
`

export default function FeatureDetection() {
  return (
    <Wrapper>
      <SmallTitle>Feature Detection</SmallTitle>
      <FeatureList>
        <Faded>
          <StatusImage value={supportsGap} /> Supports grid-gap
        </Faded>
        <Faded>
          <StatusImage value={supportsFlexGap} /> Supports flex-gap
        </Faded>
        <Faded>
          <StatusImage value={supportsAspectRatio} /> Supports aspect-ratio
        </Faded>
        <Faded>
          <StatusImage value={supportsObjectFit} /> Supports object-fit
        </Faded>
        <Faded>
          <StatusImage value={supportsFullscreen} /> Supports fullscreen
        </Faded>
      </FeatureList>
    </Wrapper>
  )
}
