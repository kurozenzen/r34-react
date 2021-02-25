import styled, { css } from 'styled-components'

export default styled.div(
  (props) => css`
    display: grid;
    padding: ${props.theme.dimensions.gutter};
    background: ${props.theme.misc.layer};
    ${props.theme.shadow.box};
    border-radius: ${props.theme.dimensions.borderRadius};
    width: 100%;
    gap: ${props.theme.dimensions.gutter};
  `
)
