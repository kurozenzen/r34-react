import styled, { css } from 'styled-components'
import { Modifier, TagType } from '../../data/types'
import { formatTagnameAndCount } from '../../misc/formatting'

interface TagNameProps {
  modifier: Modifier
  name: string
  count?: number | null
  types?: TagType[]
}

const modifierToStyle = {
  [Modifier.PLUS]: css``,
  [Modifier.MINUS]: css`
    text-decoration: line-through;
  `,
  [Modifier.OR]: css`
    font-style: italic;
  `,
}

const TagNameSpan = styled.span(
  ({ modifier = Modifier.PLUS }: Pick<TagNameProps, 'modifier'>) => modifierToStyle[modifier]
)

export default function TagName(props: TagNameProps) {
  const { modifier, name, count } = props

  const text = formatTagnameAndCount(name, count)

  return (
    <TagNameSpan modifier={modifier} tabIndex={0}>
      {text}
    </TagNameSpan>
  )
}
