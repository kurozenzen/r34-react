import React, { useMemo } from 'react'
import Surface from '../common/Surface'
import { SmallTitle } from '../common/Text'
import TagList from '../tag/TagList'
import outOfResultsPicture from '../../icons/OutOfResults.png'
import { useSelector } from 'react-redux'
import { selectAliasesAsList } from '../../redux/selectors'
import { NO_OP } from '../../data/types'
import LayoutElementProps from './LayoutElementProps'
import { HorizontalLine } from '../common/Lines'
import styled, { css } from 'styled-components'
import FlexImage from '../common/FlexImage'
import useToggleTag from '../../hooks/useToggleTag'
import * as r34 from 'r34-types'

const Div = styled.div(
  ({ theme }) => css`
    padding: ${theme.dimensions.gutter};
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
    <Div style={style} ref={virtualRef} onLoad={onLoad} role='row'>
      <StyledSurface>
        <StyledImage src={outOfResultsPicture} alt='Shironeko does not understand' />
        <HorizontalLine />
        <SmallTitle>You have reached the end!</SmallTitle>
        <p>Go look for something else!</p>
        {aliases.length > 0 && (
          <>
            <p>How about some of these?</p>
            <TagList tags={aliasesForRendering} onTagClick={toggleTag} detailed />
          </>
        )}
      </StyledSurface>
    </Div>
  )
}
