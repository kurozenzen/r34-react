import styled, { css } from "styled-components"

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
`

export default FlexColumn

export const FlexColumnWithSpacing = styled(FlexColumn)(
  ({ theme }) => css`
    gap: ${theme.dimensions.gutter};
    padding: ${theme.dimensions.gutter};
  `
)
