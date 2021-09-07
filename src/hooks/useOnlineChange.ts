import React from 'react'

interface UseOnlineChangeOptions {
  onOnline?: () => void
  onOffline?: () => void
}

export function useOnlineChange(options?: UseOnlineChangeOptions) {
  const [isOnline, setIsOnline] = React.useState(window.navigator.onLine)

  React.useEffect(() => {
    const listenter = () => {
      setIsOnline(true)
      options?.onOnline?.()
    }
    window.addEventListener('online', listenter)
    return () => window.removeEventListener('online', listenter)
  })

  React.useEffect(() => {
    const listenter = () => {
      setIsOnline(false)
      options?.onOffline?.()
    }
    window.addEventListener('offline', listenter)
    return () => window.removeEventListener('offline', listenter)
  })

  return isOnline
}
