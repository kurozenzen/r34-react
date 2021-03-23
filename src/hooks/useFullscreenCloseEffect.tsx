import { useEffect } from 'react'

export default function useFullScreenCloseEffect(effect: () => void) {
  useEffect(() => {
    const handler = (data: any) => {
      console.log(document.fullscreenElement)
      if (!document.fullscreenElement) {
        effect()
      }
    }

    document.addEventListener('fullscreenchange', handler)

    return () => {
      document.removeEventListener('fullscreenchange', handler)
    }
  }, [effect])
}
