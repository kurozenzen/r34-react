import React from 'react'
import * as r34 from 'r34-types'
import TagChip from './TagChip'

interface SupertagProps {
  tag: r34.Supertag
  isActive: boolean
  detailed: boolean
  onClick: React.MouseEventHandler
}

export default function Supertag(props: SupertagProps) {
  const { tag, isActive, detailed, onClick } = props
  const { name, tags } = tag

  const count = Object.keys(tags).length

  return (
    <TagChip
      name={name}
      modifier='+'
      type='supertag'
      count={count}
      isActive={isActive}
      detailed={detailed}
      onClick={onClick}
    />
  )
}
