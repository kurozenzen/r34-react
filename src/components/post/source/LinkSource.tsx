import React from 'react'
import { useTheme } from 'styled-components'
import { LinkIcon } from '../../../icons/Icons'
import { formatSource } from '../../../misc/formatting'
import ColoredIconLink from '../../common/ColoredIconLink'
import SourceProps from './SourceProps'

export default function DefaultLinkSource({ value }: SourceProps) {
  const color = useTheme().colors.accentColor
  const title = formatSource(value)

  return (
    <ColoredIconLink color={color} href={value} target='_blank' rel='noopener noreferrer' className='source'>
      <LinkIcon color={color} />
      {title}
    </ColoredIconLink>
  )
}
