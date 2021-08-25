import styled from 'styled-components'
import { mediaStyle } from '../../../styled/mixins/media'
import FlexImage from '../../designsystem/FlexImage'
import FlexVideo from '../../designsystem/FlexVideo'

export const PostVideo = styled(FlexVideo)`
  ${mediaStyle}
`

export const PostImage = styled(FlexImage)`
  ${mediaStyle}
`
