import firebase from 'firebase/app'
import 'firebase/auth'

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export function signIn() {
  firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .catch((error) => {
      console.error('Sign in failed:', error.code, error.message)
    })
}

export async function signOut() {
  return await firebase.auth().signOut()
}
