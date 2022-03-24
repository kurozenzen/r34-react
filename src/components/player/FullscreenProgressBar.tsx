import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NO_OP } from '../../data/types'
import { setFullscreenPost } from '../../redux/actions'
import { selectAutoscrollDelay } from '../../redux/selectors'
import { Slider } from '../designsystem/Slider'

interface FullscreenProgressBarProps {
  className?: string
  index: number
  isPaused?: boolean
  onFinished?: () => void
  onBack?: () => void
  isActive: boolean
}

export default function FullscreenProgressBar(props: FullscreenProgressBarProps) {
  const { onFinished = NO_OP, onBack = NO_OP, isActive } = props

  const keybinds: Record<string, () => void> = {
    'ArrowRight' : () => onFinished(),
    'ArrowLeft' : () => onBack()
  }

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const pressed = `${event.key}`;
      if (pressed in keybinds) {
        event.preventDefault()
        event.stopPropagation()
        keybinds[pressed]()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  })

  const dispatch = useDispatch()
  const [mouseState, setMouseState] = React.useState(false)
  const setPost = React.useCallback((newIndex) => dispatch(setFullscreenPost(newIndex)), [dispatch])
  const duration = 1000 * useSelector(selectAutoscrollDelay)
  const ref = React.useRef<HTMLInputElement>(null)

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

  React.useEffect(() => {
    if (!mouseState && isActive) {
      let handle: number
      let then = new Date().getTime()

      const renderFrame = () => {
        if (ref.current) {
          const now = new Date().getTime()
          const newValue = Number(ref.current.value) + (now - then)
          then = now

          ref.current.value = newValue.toString()
          const chromePercentage = (newValue / duration) * 100
          ref.current.style.backgroundImage = `linear-gradient(90deg, #ffffff80 ${chromePercentage}%, transparent ${chromePercentage}%)`

          if (newValue >= Number(ref.current.max)) {
            onFinished()
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
        cancelAnimationFrame(handle)
      }
    }
  }, [duration, isActive, mouseState, onFinished, props.index, setPost])

  return (
    <Slider
      ref={ref}
      type='range'
      step={1}
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
