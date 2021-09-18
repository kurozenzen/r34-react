import React from 'react'
import useIsOnScreen from './useIsOnScreen'
import { useIsScrolling } from './useIsScrolling'

export function useAutoplay(ref: Element | null) {
  const [shouldPlay, setShouldPlay] = React.useState(false)

  const [isOnScreen] = useIsOnScreen(ref)
  const isScrolling = useIsScrolling()

  React.useEffect(() => {
    if (isOnScreen && !isScrolling) {
      setShouldPlay(true)
    }
  }, [isOnScreen, isScrolling])

  React.useEffect(() => {
    if (!isOnScreen) {
      setShouldPlay(false)
    }
  }, [isOnScreen])

  return shouldPlay
}
