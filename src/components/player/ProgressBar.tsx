import React, { MouseEventHandler, useCallback, useState } from 'react'
import styled from 'styled-components'

const Progress = styled.div`
  display: inline-block;
  position: relative;
  top: -9px;
  background-color: ${(props) => props.theme.colors.accentColor};
  height: 100%;
`

const Handle = styled.div`
  display: inline-block;
  position: relative;
  height: 13px;
  width: 13px;
  top: -5.5px;
  left: -6.5px;
  border-radius: 6.5px;
  background-color: white;
`

interface ProgressBarProps {
  value: number
  maxValue: number
  onChange: (newValue: number) => void
  className?: string
}

export default function ProgressBar(props: ProgressBarProps) {
  const { value, maxValue, className, onChange } = props

  const [barRef, setBarRef] = useState<HTMLDivElement | null>(null)

  const handleClick: MouseEventHandler = useCallback(
    (event) => {
      event.stopPropagation()
      if (barRef) {
        onChange(((event.clientX - barRef.offsetLeft) / barRef.clientWidth) * maxValue)
      }
    },
    [barRef, maxValue, onChange]
  )
  return (
    <div ref={setBarRef} className={className} onClick={handleClick}>
      <Progress style={{ width: `${(value / maxValue) * 100}%` }} />
      <Handle tabIndex={0} />
    </div>
  )
}
