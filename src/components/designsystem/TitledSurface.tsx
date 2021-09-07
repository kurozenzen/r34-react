import React from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import { gap } from '../../styled/mixins/gap'
import { Surface } from './Surface'
import { Title } from './Text'

const PaddedTitle = styled(Title)(
  ({ theme }) => css`
    padding-top: ${theme.dimensions.hugeSpacing};
  `
)

const PaddedSurface = styled(Surface)(
  ({ theme, $compact }: { theme: DefaultTheme; $compact: boolean }) => css`
    padding: ${$compact ? theme.dimensions.bigSpacing : theme.dimensions.hugeSpacing};
    ${gap($compact ? theme.dimensions.bigSpacing : theme.dimensions.hugeSpacing)};
  `
)

interface TitledSurfaceProps {
  title: React.ReactNode
  children: React.ReactNode[]
  compact?: boolean
  className?: string
}

export default function TitledSurface(props: TitledSurfaceProps) {
  const { title, children, className, compact = false } = props

  return (
    <>
      <PaddedTitle>{title}</PaddedTitle>
      <PaddedSurface $compact={compact} className={className}>
        {children}
      </PaddedSurface>
    </>
  )
}
