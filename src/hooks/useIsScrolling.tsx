import React from 'react'

let isScrollingGlobal = false
let observers: React.Dispatch<React.SetStateAction<boolean>>[] = []
let listener: ((e: any) => void) | undefined
let timeoutId: NodeJS.Timeout | undefined

export const useIsScrolling = () => {
  const [isScrolling, setIsScrolling] = React.useState(isScrollingGlobal)

  if (listener === undefined) {
    listener = (e) => {
      isScrollingGlobal = true
      observers.forEach((update) => update(isScrollingGlobal))

      if (timeoutId) clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        isScrollingGlobal = false
        observers.forEach((update) => update(isScrollingGlobal))
      }, 500)
    }
    document.addEventListener('scroll', listener, { passive: true })
  }

  React.useEffect(() => {
    observers.push(setIsScrolling)
    setIsScrolling(isScrollingGlobal)
    return () => {
      observers = observers.filter((update) => update !== setIsScrolling)

      if (observers.length === 0 && listener) {
        document.removeEventListener('scroll', listener)
        listener = undefined
      }
    }
  }, [])

  // return global isOnline state and setter function
  return isScrolling
}
