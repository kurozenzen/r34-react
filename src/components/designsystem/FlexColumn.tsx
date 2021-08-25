import styled from 'styled-components'
import { defaultSpacing } from '../../styled/mixins/gap'
import { flexColumn } from '../../styled/mixins/layout'

export const FlexColumn = styled.div`
  ${flexColumn}
  width: 100%;
  min-height: 100%;
`

export const FlexColumnWithSpacing = styled(FlexColumn)`
  ${defaultSpacing}
`
