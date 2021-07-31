import styled from 'styled-components'
import { borderRadius, gutter, layer } from '../../styled/mixins'

export default styled.div`
  display: grid;
  ${gutter}
  ${layer}
  ${borderRadius}
  width: 100%;
`
