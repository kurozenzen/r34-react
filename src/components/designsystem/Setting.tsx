import React from 'react'
import styled, { css } from 'styled-components'
import { gridWithGap } from '../../styled/mixins/layout'
import { SmallTitle, Faded } from './Text'

const Grid = styled.div`
  ${gridWithGap}
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
`

const Title = styled(SmallTitle)(
  ({ theme }) => css`
    grid-column: 1/2;
    grid-row: 1/2;
  `
)

const Body = styled(Faded)(
  ({ theme }) => css`
    grid-column: 1/2;
    grid-row: 2/3;
  `
)

const Control = styled.div(
  ({ theme }) => css`
    grid-column: 2/3;
    grid-row: 1/3;
  `
)

interface SettingProps {
  title: string
  description: string
  children: React.ReactNode
}

export default function Setting({ title, description, children }: SettingProps) {
  return (
    <Grid>
      <Title>{title}</Title>
      <Body>{description}</Body>
      <Control>{children}</Control>
    </Grid>
  )
}
