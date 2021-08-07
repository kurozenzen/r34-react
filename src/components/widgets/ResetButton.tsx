import React, { useCallback } from 'react'
import { signOut } from '../../firebase'
import { UndoIcon } from '../../icons/FontAwesomeIcons'
import { BlockButton } from '../common/Buttons'

export default function ResetButton(props: any) {
  const reset = useCallback(async () => {
    localStorage.clear()
    await signOut()

    window.location.hash = ''
    window.location.reload()
  }, [])

  return (
    <BlockButton onClick={reset} {...props}>
      <UndoIcon /> Reset Application
    </BlockButton>
  )
}
