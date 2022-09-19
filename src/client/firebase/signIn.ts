import firebase from 'firebase/app'
import 'firebase/auth'

let initialized = false
let googleAuthProvider!: firebase.auth.GoogleAuthProvider

export function init() {
  googleAuthProvider = new firebase.auth.GoogleAuthProvider()
  initialized = true
}

export function signIn() {
  if (initialized) {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .catch((error) => {
        console.error('Sign in failed:', error.code, error.message)
      })
  } else {
    console.warn('Cannot sign in before initialization')
  }
}

export async function signOut() {
  if (initialized) {
    return await firebase
      .auth()
      .signOut()
      .catch((error) => {
        console.error('Sign out failed:', error.code, error.message)
      })
  } else {
    console.warn('Cannot sign out before initialization')
  }
}
