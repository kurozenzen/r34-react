import React, { MouseEventHandler, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import TagDataClass from '../../data/Tag'
import { Modifier } from '../../data/types'
import { addTag } from '../../redux/actions'
import { flexRowWithGap } from '../../styled/mixins'
import TagName from './TagName'

interface AliasProps {
  modifier: Modifier
  name: string
  count?: number | null
}

const AliasWrapper = styled.div(
  ({ theme }) => css`
    ${flexRowWithGap({ theme })}
    padding: 0 ${theme.dimensions.bigSpacing};
    height: ${theme.dimensions.blockHeight};
    font-size: ${theme.fontSizes.content};
  `
)

export default function Alias(props: AliasProps) {
  const { modifier, name, count } = props

  const dispatch = useDispatch()

  const handleClick: MouseEventHandler = useCallback(
    (event) => {
      event.stopPropagation()
      const tag = new TagDataClass(name, [], count, modifier)

      dispatch(addTag(tag))
    },
    [count, dispatch, modifier, name]
  )

  return (
    <AliasWrapper onClick={handleClick}>
      <TagName modifier={modifier} name={name} count={count} />
    </AliasWrapper>
  )
}
