import React from 'react'
import styled, { css } from 'styled-components'
import TagDataClass from '../../data/Tag'
import NewTag from './NewTag'

export const TagListWrapper = styled.div(
  ({ theme }) => css`
    display: inline-flex;
    flex-wrap: wrap;
    gap: ${theme.dimensions.gutter};
  `
)

interface TagListProps {
  tags: Record<string, TagDataClass>
  loadAliases?: boolean
  padding?: boolean
  className?: string
}

export default function TagList(props: TagListProps) {
  const { tags, loadAliases = false, className } = props

  return (
    <TagListWrapper className={className}>
      {Object.entries(tags).map(([key, tag]) => (
        <NewTag key={key} {...tag} loadAliases={loadAliases} />
      ))}
    </TagListWrapper>
  )
}
