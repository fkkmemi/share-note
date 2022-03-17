import { db } from 'boot/firebase'
import {
  collection, addDoc, doc, getDocs, getDoc, updateDoc, deleteDoc,
  query, limit, orderBy, QueryDocumentSnapshot, DocumentData, QueryConstraint, startAfter,
  where
} from 'firebase/firestore'
import { firebaseUser } from './useAuth'

export const useFirestore = () => {
  const createNote = (title: string, content: string, category: string, imageURL?: string) => {
    if (!firebaseUser.value) throw Error('user not signed')
    const noteCollection = collection(db, 'notes')

    const note = {
      title,
      content: content,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
      uid: firebaseUser.value.uid,
      imageURL
    }
    return addDoc(noteCollection, note)
  }

  const readNotes = (lastSnapshot: QueryDocumentSnapshot<DocumentData> | null, category: string) => {
    const noteCollection = collection(db, 'notes')
    const params: QueryConstraint[] = []
    params.push(orderBy('createdAt', 'desc'))
    if (category) params.push(where('category', '==', category))
    if (lastSnapshot) params.push(startAfter(lastSnapshot))
    params.push(limit(2))

    const q = query(noteCollection, ...params)
    return getDocs(q)
  }

  const readNote = (id: string) => {
    const noteRef = doc(db, 'notes', id)
    return getDoc(noteRef)
  }

  const updateNote = (id: string, title: string, content: string, category: string, imageURL: string) => {
    const noteRef = doc(db, 'notes', id)
    const note = {
      title,
      content,
      category,
      updatedAt: new Date(),
      imageURL
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
