<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useFirestore } from 'src/composables/useFirestore'
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import NoteListItem from 'src/components/NoteListItem.vue'

const { readNotes } = useFirestore()
const noteSnapshots = ref<QueryDocumentSnapshot<DocumentData>[]>([])
const lastSnapshot = ref<QueryDocumentSnapshot<DocumentData> | null>(null)
const getNotes = async () => {
  const sn = await readNotes(lastSnapshot.value)
  if (sn.empty) return
  noteSnapshots.value.push(...sn.docs)
  lastSnapshot.value = sn.docs.pop() as QueryDocumentSnapshot<DocumentData>
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
    <q-list>
      <NoteListItem v-for="doc in noteSnapshots" :key="doc.id" :doc="doc" />
    </q-list>
    <q-card-actions>
      <q-btn @click="getNotes" label="더보기" />
    </q-card-actions>

  </q-card>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn round color="accent" icon="mdi-pencil" class="" to="/write" />
  </q-page-sticky>
</template>
