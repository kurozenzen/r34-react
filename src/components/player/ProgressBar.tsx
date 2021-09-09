import React, { ChangeEventHandler, MouseEventHandler, useCallback } from 'react'
import { useTheme } from 'styled-components'
import { Slider } from '../designsystem/Slider'

interface ProgressBarProps {
  isPaused: boolean
  videoRef: HTMLVideoElement | null
  onChange: (newValue: number) => void
  className?: string
  onEnded?: () => void
}

export const ProgressBar = (props: ProgressBarProps) => {
  const { isPaused, videoRef, className, onChange, onEnded } = props

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
    if (onEnded && videoRef) {
      videoRef.addEventListener('ended', onEnded)

      return () => videoRef.removeEventListener('ended', onEnded)
    }
  })

  React.useEffect(() => {
    if (!isPaused) {
      let handle: number

      const step = () => {
        if (sliderRef?.current && videoRef) {
          sliderRef.current.value = videoRef.currentTime.toString()
          const chromePercentage = (videoRef.currentTime / videoRef.duration) * 100
          sliderRef.current.style.backgroundImage = `linear-gradient(90deg, ${theme.colors.accentColor} ${chromePercentage}%, transparent ${chromePercentage}%)`
        }

        handle = requestAnimationFrame(step)
      }

      handle = requestAnimationFrame(step)

      return () => {
        cancelAnimationFrame(handle)
      }
    }
  }, [isPaused, theme.colors.accentColor, theme.colors.backgroundColor2, videoRef])

  return (
    <Slider
      ref={sliderRef}
      type='range'
      step={1}
      min={0}
      max={videoRef?.duration || 0}
      onChange={handleChange}
      className={className}
      onClick={handleClick}
      $controls
      $accent
    />
  )
}
