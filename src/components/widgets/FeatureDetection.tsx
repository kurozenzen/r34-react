import React from 'react'
import styled from 'styled-components'
import {
  supportsAspectRatio,
  supportsFlexGap,
  supportsFullscreen,
  supportsGap,
  supportsLocalStorage,
  supportsNetworkInformationAPI,
  supportsObjectFit,
} from '../../data/browserUtils'
import { defaultSpacing } from '../../styled/mixins/gap'
import { flexColumnWithGap } from '../../styled/mixins/layout'
import { borderRadius } from '../../styled/mixins/theming'
import StatusImage from '../designsystem/StatusImage'
import { SmallTitle, Faded } from '../designsystem/Text'

const Wrapper = styled.div`
  ${flexColumnWithGap}
`

const FeatureList = styled.div`
  ${flexColumnWithGap}
  ${defaultSpacing}
  ${borderRadius}
  background: ${(props) => props.theme.colors.backgroundColor};
`

export default function FeatureDetection() {
  return (
    <Wrapper>
      <SmallTitle>Feature Detection</SmallTitle>
      <Faded>This information is really valuable when investigating layout and browser issues.</Faded>
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
        <Faded>
          <StatusImage value={supportsNetworkInformationAPI} /> Supports advanced network info
        </Faded>
        <Faded>
          <StatusImage value={supportsLocalStorage} /> Supports localStorage
        </Faded>
      </FeatureList>
    </Wrapper>
  )
}
