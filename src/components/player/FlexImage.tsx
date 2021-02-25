import styled, { css } from 'styled-components'

const FlexImage = styled.img(
  ({ width, height }) => css`
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    grid-area: 1/1/2/2;
    ${width && height
      ? css`
          aspect-ratio: ${width} / ${height};
        `
      : ''}
  `
)

export default FlexImage
