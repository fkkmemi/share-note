<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useFirestore } from 'src/composables/useFirestore'
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import NoteListItem from 'src/components/NoteListItem.vue'
import { categories } from 'src/composables/useDatabase'

const { readNotes } = useFirestore()
const noteSnapshots = ref<QueryDocumentSnapshot<DocumentData>[]>([])
const lastSnapshot = ref<QueryDocumentSnapshot<DocumentData> | null>(null)
const loading = ref(false)
const category = ref('')
const getNotes = async () => {
  if (loading.value) return
  try {
    loading.value = true
    const sn = await readNotes(lastSnapshot.value, category.value)
    if (sn.empty) return
    noteSnapshots.value.push(...sn.docs)
    lastSnapshot.value = sn.docs.pop() as QueryDocumentSnapshot<DocumentData>
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
const changeCategory = () => {
  noteSnapshots.value = []
  lastSnapshot.value = null
  getNotes()
}

const onIntersection = (obj: { isIntersecting: boolean }) => {
  if (!obj.isIntersecting) return
  getNotes()
}

onMounted(() => {
  console.log('mount')
  getNotes()
})
onUnmounted(() => {
  console.log('unmount')
})

</script>
<template>
  <q-card>
    <q-toolbar>
      <q-space/>
      <q-select dense
      v-model="category" :options="categories" filled label="category" @update:model-value="changeCategory" />
    </q-toolbar>
    <q-list>
      <NoteListItem v-for="doc in noteSnapshots" :key="doc.id" :doc="doc" />
    </q-list>
    <q-card-actions v-intersection="onIntersection">
      <q-btn @click="getNotes" label="더보기" />
    </q-card-actions>

  </q-card>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn round color="accent" icon="mdi-pencil" class="" to="/write" />
  </q-page-sticky>
</template>
