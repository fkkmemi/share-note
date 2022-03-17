import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import firebaseConfig from '../../firebaseConfig'
import firebaseJSON from '../../firebase.json'

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()
const rdb = getDatabase()
const storage = getStorage()
auth.useDeviceLanguage()

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, `http://localhost:${firebaseJSON.emulators.auth.port}`, { disableWarnings: true })
  connectFirestoreEmulator(db, 'localhost', firebaseJSON.emulators.firestore.port)
  connectDatabaseEmulator(rdb, 'localhost', firebaseJSON.emulators.database.port)
  connectStorageEmulator(storage, 'localhost', firebaseJSON.emulators.storage.port)
}

export { app, auth, db, rdb, storage }
