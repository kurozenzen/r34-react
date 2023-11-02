import styled from 'styled-components'
import { defaultSpacing } from '../../../styled/mixins/gap'
import { flexColumnWithGap } from '../../../styled/mixins/layout'

export const AdditionalDetails = styled.div`
  ${flexColumnWithGap}
  ${defaultSpacing}
  
  flex-wrap: wrap;
  grid-row: 4/5;
`
