import React from 'react'
import { useHistory } from 'react-router-dom'

/**
 * This hook adds a hash to the current route when scrolling down,
 * which causes the first back navigation to scroll up before really going back.
 * Really useful in infinite layouts where you need a quick way to go back up.
 */
export function useScrollUpBackNavigation(hash: string) {
  const history = useHistory()
  React.useEffect(() => {
    if (history.location.hash !== hash) {
      const listener = () => {
        history.push({ pathname: history.location.pathname, hash })
      }
      document.addEventListener('scroll', listener, { passive: true, once: true })
      return () => document.removeEventListener('scroll', listener)
    }
  }, [hash, history])
}
