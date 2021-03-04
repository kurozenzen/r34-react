import React, { ChangeEventHandler, MouseEventHandler, useCallback, useEffect, useState } from 'react'
import styled, { css, DefaultTheme } from 'styled-components'

function thumbStyle() {
  const commonStyle = css`
    height: 16px;
    width: 16px;
    border-radius: 100px;
    background: #ffffff;
    cursor: pointer;
  `

  return css`
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      ${commonStyle}
    }

    &::-moz-range-thumb {
      ${commonStyle}
    }

    &::-ms-thumb {
      ${commonStyle}
    }
  `
}

function trackStyle() {
  return css`
    -webkit-appearance: none;
    width: 100%;
    background: transparent;
    border-radius: 100px;
    height: 6px;

    &::-moz-range-progress {
      background-color: ${(props) => props.theme.colors.accentColor};
    }

    &::-ms-fill-lower {
      background-color: ${(props) => props.theme.colors.accentColor};
    }
  `
}

function dumbChromeProgressStyling({ chromePercentage, theme }: { chromePercentage: number; theme: DefaultTheme }) {
  return css`
    background-image: linear-gradient(
      90deg,
      ${theme.colors.accentColor} ${chromePercentage}%,
      transparent ${chromePercentage}%
    );
  `
}

const Slider = styled.input`
  ${trackStyle}
  ${thumbStyle}
    ${dumbChromeProgressStyling}
`

interface ProgressBarProps {
  value: number
  maxValue: number
  onChange: (newValue: number) => void
  className?: string
}

export default function ProgressBar(props: ProgressBarProps) {
  const { value, maxValue, className, onChange } = props

  const [internalValue, setInternalValue] = useState(value)

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      console.log('update')
      const newValue = Number(event.target.value)
      setInternalValue(newValue)
      onChange(newValue)
    },
    [onChange]
  )

  const handleClick: MouseEventHandler = useCallback((event) => {
    event.stopPropagation()
  }, [])

  // This hook ensures the parent component can control the state
  useEffect(() => {
    if (value !== internalValue) {
      setInternalValue(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <Slider
      type='range'
      step={0.034}
      min={0}
      max={maxValue}
      value={internalValue}
      onChange={handleChange}
      className={className}
      onClick={handleClick}
      chromePercentage={Math.round((internalValue / maxValue) * 100) + 1}
    />
  )
}
