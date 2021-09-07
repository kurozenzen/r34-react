import React, { MouseEventHandler } from 'react'
import FlexPair from './FlexPair'
import Toggle from './Toggle'

interface LabeledToggleProps {
  children: React.ReactNode
  value: boolean
  onToggle: MouseEventHandler
  className?: string
}

export default function LabeledToggle(props: LabeledToggleProps) {
  const { children, value, onToggle, className } = props

  return (
    <FlexPair className={className}>
      <Toggle value={value} onToggle={onToggle} />
      <span>{children}</span>
    </FlexPair>
  )
}
