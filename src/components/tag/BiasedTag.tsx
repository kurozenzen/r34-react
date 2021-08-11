import * as r34 from 'r34-types'
import TagChip from './TagChip'
import { getInterestingType } from '../../data/tagUtils'
import { TagIsActive } from '../../data/types'

interface TagProps {
  tag: r34.BiasedTag
  isActive: TagIsActive
  detailed: boolean
  onClick: React.MouseEventHandler
}

export function BiasedTag(props: TagProps) {
  const { tag, detailed, onClick, isActive } = props
  const { name, count, modifier, types } = tag

  return (
    <TagChip
      name={name}
      modifier={modifier}
      type={getInterestingType(types)}
      count={count}
      isActive={isActive}
      detailed={detailed}
      onClick={onClick}
    />
  )
}
