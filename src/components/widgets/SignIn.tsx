import { useCallback, useEffect, useState } from 'react'
import { useGoogleLogin, useGoogleLogout } from 'react-google-login'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { GoogleIcon } from '../../icons/FontAwesomeIcons'
import { fetchPreferences } from '../../redux/actions'
import { flexRowWithGap } from '../../styled/mixins'
import { RedButton } from '../common/Buttons'

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
  const dispatch = useDispatch()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLoginSuccess = useCallback((response: any) => {
    setLoggedIn(true)
  }, [])
  const handleLoginError = useCallback((response: any) => {
    setLoggedIn(false)
  }, [])
  const handleLogout = useCallback(() => {
    setLoggedIn(false)
  }, [])

  const { signIn } = useGoogleLogin({
    clientId: '305691674169-siad1mgnmg2lhrctg2jaqusuv2kj1nd1.apps.googleusercontent.com',
    onSuccess: handleLoginSuccess,
    onFailure: handleLoginError,
    cookiePolicy: 'single_host_origin',
    isSignedIn: true,
  })

  const { signOut } = useGoogleLogout({
    clientId: '305691674169-siad1mgnmg2lhrctg2jaqusuv2kj1nd1.apps.googleusercontent.com',
    onLogoutSuccess: handleLogout,
    cookiePolicy: 'single_host_origin',
  })

  const authInstance = gapi.auth2.getAuthInstance()

  const isSignedIn = authInstance?.isSignedIn.get()
  const user = authInstance?.currentUser.get().getBasicProfile()

  useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchPreferences())
    }
  })

  if (isSignedIn && user) {
    return (
      <FlexRow>
        <ProfilePicture src={user.getImageUrl()} alt={user.getName()} />
        <RedButton onClick={signOut}>
          <span>Sign Out</span>
        </RedButton>
      </FlexRow>
    )
  }

  return (
    <RedButton onClick={signIn}>
      <GoogleIcon />
      <span>Sign In</span>
    </RedButton>
  )
}
