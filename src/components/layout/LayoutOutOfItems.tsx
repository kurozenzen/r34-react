import * as r34 from 'r34-types'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { NO_OP } from '../../data/types'
import useToggleTag from '../../hooks/useToggleTag'
import outOfResultsPicture from '../../icons/OutOfResults.png'
import { selectAliasesAsList } from '../../redux/selectors'
import FlexImage from '../designsystem/FlexImage'
import { HorizontalLine } from '../designsystem/Lines'
import { Surface } from '../designsystem/Surface'
import { SmallTitle } from '../designsystem/Text'
import TagList from '../tag/TagList'
import ScrollToTopButton from '../widgets/ScrollToTopButton'
import LayoutElementProps from './LayoutElementProps'

const Div = styled.div(
  ({ theme }) => css`
    padding: ${theme.dimensions.bigSpacing};
  `
)

const StyledSurface = styled(Surface)(
  ({ theme }) => css`
    max-width: ${theme.dimensions.bodyWidth};
    margin: auto;
    text-align: center;
  `
)

const StyledImage = styled(FlexImage)`
  max-height: 50vh;
`

export default function LayoutOutOfItems({ onLoad = NO_OP, virtualRef, style }: LayoutElementProps) {
  return (
    <Div style={style} ref={virtualRef} onLoad={onLoad} role='row'>
      <OutOfItems />
    </Div>
  )
}

export function OutOfItems() {
  const aliases = useSelector(selectAliasesAsList)
  const aliasesForRendering = useMemo(
    () =>
      aliases.reduce((result, alias) => {
        result[alias.name] = { ...alias, types: [] }
        return result
      }, {} as Record<string, r34.Tag>),
    [aliases]
  )
  const toggleTag = useToggleTag()

  return (
    <StyledSurface>
      <StyledImage src={outOfResultsPicture} alt='Shironeko does not understand' />
      <HorizontalLine />
      <SmallTitle>You have reached the end!</SmallTitle>
      <p>Go look for something else!</p>
      {aliases.length > 0 && (
        <>
          <p>How about some of these?</p>
          <TagList tags={aliasesForRendering} onTagClick={toggleTag} onTagMenu={NO_OP} detailed />
        </>
      )}
      <ScrollToTopButton />
    </StyledSurface>
  )
}
