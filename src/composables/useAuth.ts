import { auth } from 'src/boot/firebase'
import {
  GoogleAuthProvider, signInWithPopup, signOut,
  onAuthStateChanged, User
} from 'firebase/auth'
import { ref } from 'vue'
const provider = new GoogleAuthProvider()

export const firebaseUser = ref<User | null>(null)
export const loading = ref(true)

onAuthStateChanged(auth, (user) => {
  firebaseUser.value = user
  loading.value = false
})

export const useAuth = () => {
  const logIn = () => {
    signInWithPopup(auth, provider)
  }

  const logOut = () => {
    signOut(auth)
  }
  return {
    logIn, logOut
  }
}
