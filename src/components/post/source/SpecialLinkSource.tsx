import React from 'react'
import ColoredIconLink from '../../common/ColoredIconLink'

interface SpecialLinkSourceProps {
  value: string
  color: string
  Icon: (props: unknown) => JSX.Element
  title: string
}

export default function SpecialLinkSource(props: SpecialLinkSourceProps) {
  const { value, color, Icon, title } = props
  return (
    <ColoredIconLink href={value} target='_blank' rel='noopener noreferrer' className='source' color={color}>
      <Icon />
      {title}
    </ColoredIconLink>
  )
}
