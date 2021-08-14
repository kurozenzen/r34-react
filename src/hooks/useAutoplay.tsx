import React from 'react'
import { useSelector } from 'react-redux'
import { selectAutoPlay } from '../redux/selectors'
import useIsOnScreen from './useIsOnScreen'
import { useIsScrolling } from './useIsScrolling'

export function useAutoplay(ref: Element | null) {
  const [playing, setPlaying] = React.useState(false)

  const autoPlay = useSelector(selectAutoPlay)
  const [isOnScreen] = useIsOnScreen(ref)
  const isScrolling = useIsScrolling()

  React.useEffect(() => {
    if (autoPlay && isOnScreen && !isScrolling) {
      setPlaying(true)
    }
  }, [autoPlay, isOnScreen, isScrolling])

  React.useEffect(() => {
    if (!isOnScreen) {
      setPlaying(false)
    }
  }, [isOnScreen])

  return playing
}
