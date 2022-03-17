import { ref } from 'vue'
import { ref as dref, set, onValue } from 'firebase/database'
import { rdb } from 'src/boot/firebase'

export const categories = ref<string[]>([])
const categoryRef = dref(rdb, 'categories')

onValue(categoryRef, sn => {
  categories.value = sn.val()
})

export const useDatabase = () => {
  const setCategories = () => {
    return set(categoryRef, categories.value)
  }

  return {
    setCategories

  }
}
