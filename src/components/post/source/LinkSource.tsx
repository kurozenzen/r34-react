import React from 'react'
import { useTheme } from 'styled-components'
import { LinkIcon } from '../../../icons/FontAwesomeIcons'
import { formatSource } from '../../../misc/formatting'
import ColoredIconLink from '../../designsystem/ColoredIconLink'
import SourceProps from './SourceProps'

export default function DefaultLinkSource({ value }: SourceProps) {
  const color = useTheme().colors.accentColor
  const title = formatSource(value)

  return (
    <ColoredIconLink
      data-testid='link-source'
      color={color}
      href={value}
      target='_blank'
      rel='noopener noreferrer'
      className='source'
    >
      <LinkIcon color={color} />
      {title}
    </ColoredIconLink>
  )
}
