import { db } from 'boot/firebase'
import { collection, addDoc, doc, getDocs, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { firebaseUser } from './useAuth'

export const useFirestore = () => {
  const createNote = (title: string, content: string, category: string) => {
    if (!firebaseUser.value) throw Error('user not signed')
    const noteCollection = collection(db, 'notes')

    const note = {
      title,
      content: content,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
      uid: firebaseUser.value.uid
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

  const updateNote = (id: string, title: string, content: string, category: string) => {
    const noteRef = doc(db, 'notes', id)
    const note = {
      title,
      content,
      category,
      updatedAt: new Date()
    }
    return updateDoc(noteRef, note)
  }

  const deleteNote = (id: string) => {
    const noteRef = doc(db, 'notes', id)
    return deleteDoc(noteRef)
  }

  return {
    createNote,
    readNotes,
    readNote,
    updateNote,
    deleteNote
  }
}
