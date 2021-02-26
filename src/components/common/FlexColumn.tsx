import styled from 'styled-components'
import { flexColum, gutter, centeredMaxWidth } from '../../styled/mixins'

const FlexColumn = styled.div`
  ${flexColum}
  width: 100%;
  min-height: 100%;
`

export default FlexColumn

export const FlexColumnWithSpacing = styled(FlexColumn)`
  ${gutter}
  ${centeredMaxWidth}
`
