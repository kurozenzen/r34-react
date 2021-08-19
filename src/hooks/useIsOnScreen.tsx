import React from 'react'

// List of handlers paired with the target element for identification
let handlers: Array<{ element: Element; update: (isOnScreen: boolean) => void }> = []

// global handler that can handle multiple entires at the same time
const handleOnScreenChange = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    const handler = handlers.find((h) => h.element === entry.target)

    if (handler) {
      handler.update(entry.isIntersecting)
    }
  })
}

// single observer
const observer = new IntersectionObserver(handleOnScreenChange, { threshold: 1 })

/**
 * Provides a boolean value indicating whether the {@link target} is fully visible on screen
 */
export default function useIsOnScreen(target: Element | null) {
  const [isOnScreen, setOnScreen] = React.useState(false)

  const onIsOnScreenChange = React.useCallback((value: boolean) => {
    setOnScreen(value)
  }, [])

  React.useEffect(() => {
    if (target) {
      const handler = { element: target, update: onIsOnScreenChange }
      handlers.push(handler)
      observer.observe(target)

      return () => {
        handlers.filter((h) => h !== handler)
        observer.unobserve(target)
      }
    }
  }, [onIsOnScreenChange, target])

  return [isOnScreen]
}
