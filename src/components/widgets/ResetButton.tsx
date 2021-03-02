import React, { useCallback } from 'react'
import { BlockButton } from '../common/Buttons'

export default function ResetButton(props: any) {
  const reset = useCallback(() => {
    localStorage.clear()
    window.location.hash = ''
    window.location.reload()
  }, [])

  return (
    <BlockButton onClick={reset} {...props}>
      Reset Application
    </BlockButton>
  )
}
