import React from 'react'
import styled, { css } from 'styled-components'
import { AnyBiasedTag, AnyTag } from 'r34-types'
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
  /**
   * The entries of the list. Must be a map to avoid duplicates
   */
  tags: Record<string, AnyTag>
  /**
   * Passthrough classname for styling from outside
   */
  className?: string
  /**
   * Setting detailed to true displays a type for some tags and provides the ability to add aliases.
   */
  detailed: boolean
  /**
   * Children will be added at the end of the list. Here you can provide additional functionality or information
   */
  children?: React.ReactNode

  onTagClick: (tag: AnyBiasedTag) => void
  getIsActive?: (tag: AnyTag) => boolean
}

/**
 * This component can be used to display multiple tags in a list of chips/badges.
 *
 */
export default function TagList(props: TagListProps) {
  const { tags, className, detailed, children = null, onTagClick, getIsActive } = props

  return (
    <TagListWrapper className={className}>
      {Object.entries(tags).map(([key, tag]) => (
        <Tag key={key} detailed={detailed} tag={tag} onClick={onTagClick} isActive={getIsActive?.(tag) || false} />
      ))}
      {children}
    </TagListWrapper>
  )
}
