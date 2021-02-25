import React, { MouseEventHandler } from "react"
import FlexPair from "./FlexPair"
import Toggle from "./Toggle"

interface LabeledToggleProps {
  children: JSX.Element | string
  value: boolean
  onToggle: MouseEventHandler
}

export default function LabeledToggle(props: LabeledToggleProps) {
  const { children, value, onToggle } = props

  return (
    <FlexPair>
      <Toggle value={value} onToggle={onToggle} />
      <span>{children}</span>
    </FlexPair>
  )
}
