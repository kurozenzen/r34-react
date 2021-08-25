import styled from 'styled-components'
import { flexMedia, preserveAspectRatio } from '../../styled/mixins/media'

const FlexVideo = styled.video`
  ${flexMedia}
  ${preserveAspectRatio}
  grid-area: 1/1/2/2;
`

export default FlexVideo
