import { TagModifier } from 'r34-types'
import { formatTagnameAndCount } from '../../misc/formatting'
import { ModifierStyledText } from '../designsystem/ModifierStyledText'

interface TagNameProps {
  modifier: TagModifier
  name: string
  count?: number
}

export default function TagName(props: TagNameProps) {
  const { modifier, name, count } = props

  return <ModifierStyledText modifier={modifier}>{formatTagnameAndCount(name, count)}</ModifierStyledText>
}
