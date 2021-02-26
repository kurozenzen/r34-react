import React from 'react'
import { BrandIcon } from '../../../icons/Icons'
import ColoredIconLink from '../../common/ColoredIconLink'

interface SpecialLinkSourceProps {
  value: string
  color: string
  icon: string
  title: string
}

export default function SpecialLinkSource(props: SpecialLinkSourceProps) {
  const { value, color, icon, title } = props
  return (
    <ColoredIconLink href={value} target='_blank' rel='noopener noreferrer' className='source' color={color}>
      <BrandIcon color={color} icon={icon} />
      {title}
    </ColoredIconLink>
  )
}
