import React from 'react'
import firebase from 'firebase'
import * as r34 from 'r34-types'
import useFirebaseAuthState from './useFirebaseAuthState'
import { sha256 } from '../data/encryption'

export function useSupertags() {
  const [supertags, setSupertags] = React.useState<Record<string, r34.SupertagData>>({})
  const [collection, setCollection] = React.useState<firebase.firestore.CollectionReference>()

  const [, userInfo] = useFirebaseAuthState()

  React.useEffect(() => {
    if (userInfo?.email) {
      sha256(userInfo.email)
        .then((hash) => {
          const col = firebase.firestore().collection(`users/${hash}/supertags`)
          setCollection(col)
          return col.get()
        })
        .then((snapshot) => {
          const result = snapshot.docs.reduce((result, doc) => {
            result[doc.id] = doc.data() as r34.SupertagData
            return result
          }, {} as Record<string, r34.SupertagData>)

          setSupertags(result)
        })
        .catch((err) => {
          console.error('Error with useSupertags', err)
        })
    }
  }, [userInfo?.email])

  React.useEffect(() => {
    if (collection) {
      const unsubscribe = collection.onSnapshot((snapshot) => {
        const result = snapshot.docs.reduce((result, doc) => {
          const userSupertags = doc
          result[userSupertags.id] = doc.data() as r34.SupertagData
          return result
        }, {} as Record<string, r34.SupertagData>)

        setSupertags(result)
      })

      return () => {
        unsubscribe()
      }
    }
  }, [collection])

  return supertags
}
