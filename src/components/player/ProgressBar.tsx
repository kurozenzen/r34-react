import React, { ChangeEventHandler, MouseEventHandler, useCallback } from 'react'
import styled, { css, useTheme } from 'styled-components'

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

const Slider = styled.input`
  ${trackStyle}
  ${thumbStyle}
`

interface ProgressBarProps {
  isPaused: boolean
  videoRef: HTMLVideoElement | null
  onChange: (newValue: number) => void
  className?: string
}

export const ProgressBar = (props: ProgressBarProps) => {
  const { isPaused, videoRef, className, onChange } = props

  const sliderRef = React.useRef<HTMLInputElement>(null)

  const theme = useTheme()

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const newValue = Number(event.target.value)
      onChange(newValue)
    },
    [onChange]
  )

  const handleClick: MouseEventHandler = useCallback((event) => {
    event.stopPropagation()
  }, [])

  React.useEffect(() => {
    if (!isPaused) {
      const handle = setInterval(() => {
        if (sliderRef?.current && videoRef) {
          sliderRef.current.value = videoRef.currentTime.toString()
          const chromePercentage = Math.round((videoRef.currentTime / videoRef.duration) * 100)
          sliderRef.current.style.backgroundImage = `linear-gradient(90deg, ${theme.colors.accentColor} ${chromePercentage}%, transparent ${chromePercentage}%)`
        }

        return () => clearInterval(handle)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused])

  // // This hook ensures the parent component can control the state
  // useEffect(() => {
  //   if (value !== internalValue) {
  //     setInternalValue(value)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [value])

  return (
    <Slider
      ref={sliderRef}
      type='range'
      step={0.034}
      min={0}
      max={videoRef?.duration || 0}
      onChange={handleChange}
      className={className}
      onClick={handleClick}
    />
  )
}
