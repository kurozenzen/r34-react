import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { sha256 } from '../data/encryption'
import { User, SupertagDetails } from './types'
import { PreferencesState } from '../redux/reducers/preferences'
import { GenericConverter } from './genericConverter'
import { Modifier } from '../data/types'
import { useEffect, useState } from 'react'

const userConverter = new GenericConverter<User>()

async function getUserDoc() {
  const { currentUser } = firebase.auth()
  const email = currentUser?.email

  if (email) {
    const key = await sha256(email)
    const userDoc = firebase.firestore().collection('users').doc(key)
    return userDoc
  }

  return undefined
}

async function getUserData() {
  const userDoc = await getUserDoc()

  if (userDoc) {
    let userSnap = await userDoc.withConverter(userConverter).get()

    const userData = userSnap.data()
    return userData
  }

  return undefined
}

export async function getPreferences() {
  const userData = await getUserData()
  if (userData) {
    return userData.preferences
  }

  return undefined
}

export async function setPreferences(preferences: PreferencesState) {
  const userDoc = await getUserDoc()

  if (userDoc) {
    await userDoc.set({ preferences: preferences })
  }
}

export async function getSeenPosts() {
  const userDoc = await getUserDoc()

  if (userDoc) {
    const snap = await userDoc.collection('seenposts').get()
    const result: Record<string, {}> = {}

    snap.forEach((doc) => {
      const posstId = doc.id as string
      result[posstId] = doc.data() as SupertagDetails
    })

    return result
  }

  return undefined
}

export async function resetSeenPosts() {
  const userDoc = await getUserDoc()

  if (userDoc) {
    console.log('broken')
  }
}

export async function getSupertags() {
  const userDoc = await getUserDoc()

  if (userDoc) {
    const snap = await userDoc.collection('supertags').get()
    const result: Record<string, SupertagDetails> = {}

    snap.forEach((doc) => {
      result[doc.id] = doc.data() as SupertagDetails
    })

    return result
  }

  return undefined
}

export async function addSupertag(name: string, description: string, tags: Record<string, Modifier>) {
  const userDoc = await getUserDoc()

  if (userDoc) {
    userDoc.collection('supertags').doc(name).set({ description, tags })
  }
}

export async function removeSupertag(name: string) {
  const userDoc = await getUserDoc()

  if (userDoc) {
    userDoc.collection('supertags').doc(name).delete()
  }
}

export function useSupertags() {
  const [supertags, setSupertags] = useState<Record<string, SupertagDetails>>({})
  const [collection, setCollection] = useState<firebase.firestore.CollectionReference>()

  useEffect(() => {
    const { currentUser } = firebase.auth()
    const email = currentUser?.email

    if (email) {
      sha256(email)
        .then((hash) => {
          const col = firebase.firestore().collection(`users/${hash}/supertags`)
          setCollection(col)
          return col.get()
        })
        .then((snapshot) => {
          const result = snapshot.docs.reduce((result, doc) => {
            result[doc.id] = doc.data() as SupertagDetails
            return result
          }, {} as Record<string, SupertagDetails>)

          setSupertags(result)
        })
    }
  }, [])

  useEffect(() => {
    if (collection) {
      const unsubscribe = collection.onSnapshot((snapshot) => {
        const result = snapshot.docs.reduce((result, doc) => {
          const userSupertags = doc
          result[userSupertags.id] = doc.data() as SupertagDetails
          return result
        }, {} as Record<string, SupertagDetails>)

        setSupertags(result)
      })

      return () => {
        unsubscribe()
      }
    }
  }, [collection])

  return supertags
}
