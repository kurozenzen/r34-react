import React, { useCallback } from 'react'
import { signOut } from '../../client/firebase'
import { UndoIcon } from '../../icons/FontAwesomeIcons'
import { BlockButton } from '../designsystem/Buttons'

export default function ResetButton(props: any) {
  const reset = useCallback(async () => {
    // localStorage can be disabled in browser settings
    localStorage?.clear()

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
