import styled from 'styled-components'
import { preserveAspectRatio, flexMedia } from '../../styled/mixins'

const FlexImage = styled.img`
  ${flexMedia}
  ${preserveAspectRatio}
`

export default FlexImage
