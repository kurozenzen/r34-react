import styled from 'styled-components'
import { borderRadius, boxShadow, gutter, layer } from '../../styled/mixins'

export default styled.div`
  display: grid;
  ${gutter}
  ${layer}
  ${boxShadow}
  ${borderRadius}
  width: 100%;
`
