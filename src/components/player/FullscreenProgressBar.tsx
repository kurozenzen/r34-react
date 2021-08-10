import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NO_OP } from '../../data/types'
import { setFullscreenPost } from '../../redux/actions'
import { Slider } from '../designsystem/Slider'

const duration = 5000

interface FullscreenProgressBarProps {
  className?: string
  index: number
  isPaused?: boolean
}

export default function FullscreenProgressBar(props: FullscreenProgressBarProps) {
  const [mouseState, setMouseState] = useState(false)
  const dispatch = useDispatch()
  const setPost = useCallback((newIndex) => dispatch(setFullscreenPost(newIndex)), [dispatch])

  React.useEffect(() => {
    const listener = () => setMouseState(true)
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  })

  React.useEffect(() => {
    const listener = () => setMouseState(false)
    document.addEventListener('mouseup', listener)
    document.addEventListener('touchend', listener)

    return () => {
      document.removeEventListener('mouseup', listener)
      document.removeEventListener('touchend', listener)
    }
  })

  const ref = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (!mouseState) {
      let handle: number
      let then = new Date().getTime()

      const renderFrame = () => {
        if (ref.current) {
          const now = new Date().getTime()
          const newValue = Number(ref.current.value) + (now - then)
          then = now

          ref.current.value = newValue.toString()
          const chromePercentage = Math.round((newValue / duration) * 100)
          ref.current.style.backgroundImage = `linear-gradient(90deg, #ffffff80 ${chromePercentage}%, transparent ${chromePercentage}%)`

          if (newValue >= Number(ref.current.max)) {
            setPost(props.index + 1)
            if (ref.current) {
              ref.current.value = '0'
            }
          } else {
            handle = requestAnimationFrame(renderFrame)
          }
        }
      }

      handle = requestAnimationFrame(renderFrame)

      return () => {
        console.log('removed interval')
        cancelAnimationFrame(handle)
      }
    }
  }, [mouseState, props.index, setPost])

  return (
    <Slider
      ref={ref}
      type='range'
      step={0.034}
      min={0}
      max={duration}
      onChange={NO_OP}
      onClick={NO_OP}
      $controls={false}
      $accent={false}
      className={props.className}
    />
  )
}
