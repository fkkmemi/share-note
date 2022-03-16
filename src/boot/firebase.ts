import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import firebaseConfig from '../../firebaseConfig'
import firebaseJSON from '../../firebase.json'

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()
auth.useDeviceLanguage()

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, `http://localhost:${firebaseJSON.emulators.auth.port}`, { disableWarnings: true })
  connectFirestoreEmulator(db, 'localhost', firebaseJSON.emulators.firestore.port)
}

export { app, auth, db }
