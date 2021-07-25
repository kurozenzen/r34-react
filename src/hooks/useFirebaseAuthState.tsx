import firebase from 'firebase/app'
import 'firebase/auth'
import { useEffect, useState } from 'react'

/**
 * A hook that provides the firebase authentication status for use in functional components.
 */
export default function useFirebaseAuthState() {
  const [authState, setAuthState] = useState(false)
  const [user, setUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthState(true)
        setUser(user)
      } else {
        setAuthState(false)
        setUser(null)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return [authState, user] as const
}
