import styled from 'styled-components'
import { flexMedia, preserveAspectRatio } from '../../styled/mixins/media'

const FlexImage = styled.img`
  ${flexMedia}
  ${preserveAspectRatio}
`

export default FlexImage
