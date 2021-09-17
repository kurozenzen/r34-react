import styled from 'styled-components'
import { centeredMaxWidth } from '../../styled/mixins/layout'
import { FlexColumnWithSpacing } from './FlexColumn'

export const DefaultPageColumn = styled(FlexColumnWithSpacing)`
  ${centeredMaxWidth}
  flex-grow: 1;
`
