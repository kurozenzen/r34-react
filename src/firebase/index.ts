import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBHdepwE7M4Byu2lFtX2s__9COcMdvXu7Q',
  authDomain: 'r34-react.firebaseapp.com',
  databaseURL: 'https://r34-react.firebaseio.com',
  projectId: 'r34-react',
  storageBucket: 'r34-react.appspot.com',
  messagingSenderId: '844749417844',
  appId: '1:844749417844:web:11fa1fda0e14f1ac2dd021',
  measurementId: 'G-27J3QXZ8YR',
}

firebase.initializeApp(firebaseConfig)

export * from './analytics'
export * from './signIn'
export * from './storage'
