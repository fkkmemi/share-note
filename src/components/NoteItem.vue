<script setup lang="ts">
import { defineProps, onMounted, ref, computed } from 'vue'
import { useFirestore } from 'src/composables/useFirestore'
import { DocumentSnapshot, DocumentData } from 'firebase/firestore'
const { readNote } = useFirestore()
const props = defineProps<{ id: string }>()
const doc = ref<DocumentSnapshot<DocumentData> | null>(null)
const loading = ref(true)
const getNote = async () => {
  doc.value = await readNote(props.id)
  loading.value = false
}
const item = computed(() => {
  if (!doc.value) {
    return {
      title: ''
    }
  }
  const data = doc.value.data()
  if (!data) {
    return {
      title: ''
    }
  }
  return {
    title: data.title,
    content: data.content,
    createdAt: data.createdAt.toDate(),
    uid: data.uid
  }
})

onMounted(() => {
  getNote()
})
</script>
<template>
  <div v-if="!loading">
    <q-card>
      <q-card-section class="text-h5">
        {{item.title}}
      </q-card-section>
      <q-card-section style="white-space:pre">
        {{item.content}}
      </q-card-section>
      <q-card-section>
        작성일: {{item.createdAt}}
      </q-card-section>
      <q-card-actions>
        <q-space />
        <q-btn to="/" label="목록" icon="mdi-arrow-left" />
      </q-card-actions>
    </q-card>
  </div>
  <div v-else><q-circular-progress  indeterminate  /></div>
</template>
