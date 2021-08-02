import React from 'react'
import Setting from '../common/Setting'
import SignIn from '../widgets/SignIn'

export default function PrefAccount() {
  return (
    <Setting
      title='Account'
      description='Sign in to save your settings across devices. Some settings require you to be signed in because they use your data.'
    >
      <SignIn />
    </Setting>
  )
}
