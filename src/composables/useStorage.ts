import { storage } from 'src/boot/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const useStorage = () => {
  const addImage = async (file: File) => {
    const imageRef = ref(storage, 'images/' + file.name)
    const sn = await uploadBytes(imageRef, file)
    return getDownloadURL(sn.ref)
  }

  return {
    addImage

  }
}
