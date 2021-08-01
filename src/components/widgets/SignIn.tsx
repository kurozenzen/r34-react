import { useCallback } from 'react'
import styled, { css } from 'styled-components'
import { signIn, signOut } from '../../firebase'
import useFirebaseAuthState from '../../hooks/useFirebaseAuthState'
import { GoogleIcon } from '../../icons/FontAwesomeIcons'
import { flexRowWithGap } from '../../styled/mixins'
import { RedButton } from '../common/Buttons'
import FlexColumn from '../common/FlexColumn'

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
          <RedButton onClick={handleSignOut}>
            <span>Sign Out</span>
          </RedButton>
        </FlexRow>
      </FlexColumn>
    )
  }

  return (
    <RedButton onClick={handleSignIn}>
      <GoogleIcon />
      <span>Sign In</span>
    </RedButton>
  )
}
