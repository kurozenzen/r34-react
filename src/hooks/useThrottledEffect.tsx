import { useEffect, useRef } from 'react'

/**
 * wraps your effect so that it can only be called in a set interval
 */
export default function useThrottledEffect(callback: () => void, delay: number, deps: any[] = []) {
  const lastRun = useRef(Date.now())

  useEffect(() => {
    const handler = setTimeout(() => {
      const now = Date.now()
      const then = lastRun.current

      if (now - then >= delay) {
        callback()
        lastRun.current = now
      }
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [delay, ...deps])
}
