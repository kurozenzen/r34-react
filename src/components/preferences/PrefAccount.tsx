import React from 'react'
import Setting from '../designsystem/Setting'
import SignIn from '../widgets/SignIn'

export default function PrefAccount() {
  return (
    <Setting
      title='Account'
      description='Sign in to save your preferences across devices. Some preferences require you to be signed in because they use your stored data.'
    >
      <SignIn />
    </Setting>
  )
}
