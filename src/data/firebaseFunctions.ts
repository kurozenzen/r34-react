import firebase from 'firebase/app'
import 'firebase/auth'
import { sha256 } from './encryption'

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export function signIn() {
  firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .catch((error) => {
      console.error('Fail.', error.code, error.message)
    })
}

export async function signOut() {
  return await firebase.auth().signOut()
}

export async function resetSeenPosts() {
  const { currentUser } = firebase.auth()
  const email = currentUser?.email

  if (email) {
    const db = firebase.firestore()
    const seenPostsCollection = db.collection('seenPosts')
    const key = await sha256(email)
    await seenPostsCollection.doc(key).set({})
  }
}
