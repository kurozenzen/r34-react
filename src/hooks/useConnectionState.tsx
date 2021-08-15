import { useState, useEffect } from 'react'

export function useConnectionState() {
  //@ts-expect-error
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

  const [connectionState, setConnectionState] = useState<string | undefined>(connection?.type)

  useEffect(() => {
    if (connection) {
      const listener = () => setConnectionState(connection.type)
      connection.addEventListener('change', listener, { passive: true })
      return () => connection.removeEventListener('change', listener)
    }
  }, [connection])

  return connectionState as
    | 'bluetooth'
    | 'cellular'
    | 'ethernet'
    | 'none'
    | 'wifi'
    | 'wimax'
    | 'other'
    | 'unknown'
    | undefined
}
