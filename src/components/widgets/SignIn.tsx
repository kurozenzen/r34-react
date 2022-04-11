import { useCallback } from 'react'
import styled, { css } from 'styled-components'
import { signIn, signOut } from '../../client/firebase'
import useFirebaseAuthState from '../../hooks/useFirebaseAuthState'
import { GoogleIcon, SignOutIcon } from '../../icons/FontAwesomeIcons'
import { flexRowWithGap } from '../../styled/mixins/layout'
import { PrimaryButton } from '../designsystem/Buttons'
import { FlexColumn } from '../designsystem/FlexColumn'

const FlexRow = styled.div`
  ${flexRowWithGap}
`

const ProfilePicture = styled.img(
  ({ theme }) => css`
    height: ${theme.dimensions.blockHeight};
    width: ${theme.dimensions.blockHeight};
    border-radius: ${theme.dimensions.borderRadius};
  `
)

export default function SignIn() {
  const [isSignedIn, user] = useFirebaseAuthState()
  const handleSignIn = useCallback(signIn, [])
  const handleSignOut = useCallback(signOut, [])

  if (isSignedIn) {
    const name = user?.displayName || user?.email || ''
    const picture = user?.photoURL || ''

    return (
      <FlexColumn>
        <FlexRow>
          <ProfilePicture src={picture} alt={name} title={name} />
          <PrimaryButton onClick={handleSignOut}>
            <SignOutIcon />
            <span>Sign Out</span>
          </PrimaryButton>
        </FlexRow>
      </FlexColumn>
    )
  }

  return (
    <PrimaryButton onClick={handleSignIn}>
      <GoogleIcon />
      <span>Sign In</span>
    </PrimaryButton>
  )
}
