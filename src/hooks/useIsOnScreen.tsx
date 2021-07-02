import { useCallback, useEffect, useState } from 'react'

export default function useIsOnScreen(target: Element | null, options?: IntersectionObserverInit) {
  const [isOnScreen, setOnScreen] = useState(false)

  const handleOnScreenChange = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    setOnScreen(entry.isIntersecting)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleOnScreenChange, options || { threshold: 1, root: null })

    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [handleOnScreenChange, options, target])

  return [isOnScreen]
}
