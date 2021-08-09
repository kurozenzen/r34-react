import styled, { css } from 'styled-components'
import { TagModifier } from 'r34-types'

const modifierToStyle = {
  '+': css``,
  '-': css`
    text-decoration: line-through;
  `,
  '~': css`
    font-style: italic;
  `,
}

interface ModifierStyledTextProps {
  modifier: TagModifier
}

export const ModifierStyledText = styled.span(
  ({ modifier = '+' }: ModifierStyledTextProps) => modifierToStyle[modifier]
)
