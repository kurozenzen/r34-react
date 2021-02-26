import styled, { css } from 'styled-components'
import { gutter, layer } from '../../styled/mixins'

export default styled.div(
  (props) => css`
    display: grid;
    ${gutter(props)}
    ${layer(props)}
    ${props.theme.shadow.box};
    border-radius: ${props.theme.dimensions.borderRadius};
    width: 100%;
  `
)
