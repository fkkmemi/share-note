import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import firebaseConfig from '../../firebaseConfig'
import firebaseJSON from '../../firebase.json'

const app = initializeApp(firebaseConfig)
const auth = getAuth()
auth.useDeviceLanguage()

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, `http://localhost:${firebaseJSON.emulators.auth.port}`)
}

export { app, auth }
