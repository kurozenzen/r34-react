import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchPreferences } from '../redux/actions'
import useFirebaseAuthState from './useFirebaseAuthState'

export function useLoadPreferences() {
  const dispatch = useDispatch()
  const [isSignedIn] = useFirebaseAuthState()

  React.useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchPreferences())
    }
  }, [dispatch, isSignedIn])
}
