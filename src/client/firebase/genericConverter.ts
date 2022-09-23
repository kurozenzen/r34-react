import firebase from "firebase/app"

export class GenericConverter<T> {
  toFirestore(data: T): firebase.firestore.DocumentData {
    return data as firebase.firestore.DocumentData
  }
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): T {
    const data = snapshot.data(options)!
    return data as T
  }
}
