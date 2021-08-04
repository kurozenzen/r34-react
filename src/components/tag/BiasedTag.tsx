import * as r34 from 'r34-types'
import TagChip from './TagChip'
import { getInterestingType } from '../../data/utils'

interface TagProps {
  tag: r34.BiasedTag
  isActive: boolean
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
