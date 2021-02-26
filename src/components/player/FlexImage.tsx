import styled from 'styled-components'
import { preserveAspectRatio, flexMedia } from '../../styled/mixins'

const FlexImage = styled.img`
  ${flexMedia}
  ${preserveAspectRatio}
  grid-area: 1/1/2/2;
`

export default FlexImage
