import React, { MouseEventHandler, useCallback } from 'react'
import * as r34 from 'r34-types'
import { bias, isBiased, isSupertag } from '../../data/tagUtils'
import Supertag from './Supertag'
import { BiasedTag } from './BiasedTag'
import { TagIsActive } from '../../data/types'

interface TagProps {
  tag: r34.AnyBiasedTag | r34.AnyTag
  isActive: TagIsActive
  detailed: boolean
  onClick: (tag: r34.AnyBiasedTag) => void
  onContextMenu: (tag: r34.AnyBiasedTag) => void
}

export default function Tag(props: TagProps) {
  const { tag, isActive, detailed, onClick, onContextMenu } = props

  const biasedTag = isSupertag(tag) || isBiased(tag) ? tag : bias(tag, '+')

  const handleClick: MouseEventHandler = useCallback(
    (event) => {
      event?.stopPropagation()
      onClick(biasedTag)
    },
    [onClick, biasedTag]
  )

  const handleContextMenu: MouseEventHandler = useCallback(
    (event) => {
      onContextMenu(biasedTag)
    },
    [biasedTag, onContextMenu]
  )

  return isSupertag(biasedTag) ? (
    <Supertag tag={biasedTag} isActive={isActive} detailed={detailed} onClick={handleClick} />
  ) : (
    <BiasedTag
      tag={biasedTag}
      isActive={isActive}
      detailed={detailed}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    />
  )
}
