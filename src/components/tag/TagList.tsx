import React from 'react'
import styled, { css } from 'styled-components'
import TagDataClass from '../../data/TagDataClass'
import { flexRowGap, flexColumnGap } from '../../styled/mixins'
import Tag from './Tag'

const TagListWrapper = styled.div(
  ({ theme }) => css`
    display: inline-flex;
    flex-wrap: wrap;
    ${flexRowGap(theme.dimensions.gutter)}
    ${flexColumnGap(theme.dimensions.gutter)}
  `
)

interface TagListProps {
  tags: Record<string, TagDataClass>
  className?: string
  detailed: boolean
}

export default function TagList(props: TagListProps) {
  const { tags, className, detailed } = props

  return (
    <TagListWrapper className={className}>
      {Object.entries(tags).map(([key, tag]) => (
        <Tag key={key} detailed={detailed} {...tag} />
      ))}
    </TagListWrapper>
  )
}
