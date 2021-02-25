import React from 'react'
import styled, { css } from 'styled-components'
import { VerticalLine } from '../common/Lines'

const FotterWrapper = styled.footer(
  (props) => css`
    display: grid;
    grid-template-columns: 1fr 1px 1fr 1px 1fr;
    justify-content: space-around;
    padding: ${props.theme.dimensions.spacing};
  `
)

const CenteredA = styled.a`
  text-align: center;
`

export default function Footer() {
  return (
    <FotterWrapper>
      <CenteredA href='https://github.com/kurozenzen/r34-react/issues/new?template=bug_report.md'>
        Report a bug
      </CenteredA>
      <VerticalLine />
      <CenteredA href='https://github.com/kurozenzen/r34-react'>Github</CenteredA>
      <VerticalLine />
      <CenteredA href='https://github.com/kurozenzen/r34-react/issues/new?template=feature_request.md'>
        Feature request
      </CenteredA>
    </FotterWrapper>
  )
}
