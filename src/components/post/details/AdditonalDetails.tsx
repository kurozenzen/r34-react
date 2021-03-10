import styled from 'styled-components'
import { flexColumnWithGap, gutter } from '../../../styled/mixins'

export const AdditionalDetails = styled.div`
  ${flexColumnWithGap}
  ${gutter}
  
  flex-wrap: wrap;
  padding-top: 0;
  grid-row: 4/5;
`
