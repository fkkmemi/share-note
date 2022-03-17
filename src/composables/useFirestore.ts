import { db } from 'boot/firebase'
import { collection, addDoc, doc, getDocs, getDoc } from 'firebase/firestore'
import { firebaseUser } from './useAuth'

export const useFirestore = () => {
  const createNote = (title: string, content: string) => {
    if (!firebaseUser.value) throw Error('user not signed')
    const noteCollection = collection(db, 'notes')

    const note = {
      title, content: content, createdAt: new Date(), uid: firebaseUser.value.uid
    }
    return addDoc(noteCollection, note)
  }

  const readNotes = () => {
    const noteCollection = collection(db, 'notes')
    return getDocs(noteCollection)
  }

  const readNote = (id: string) => {
    const noteRef = doc(db, 'notes', id)
    return getDoc(noteRef)
  }

  return {
    createNote,
    readNotes,
    readNote
  }
}
