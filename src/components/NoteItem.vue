<script setup lang="ts">
import { defineProps, onMounted, ref, computed } from 'vue'
import { useFirestore } from 'src/composables/useFirestore'
import { DocumentSnapshot, DocumentData } from 'firebase/firestore'
import { useRouter } from 'vue-router'
const router = useRouter()
const { readNote, deleteNote } = useFirestore()
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
    updatedAt: data.updatedAt.toDate(),
    uid: data.uid,
    category: data.category
  }
})

const remove = async () => {
  if (!confirm('정말 삭제하실래요?')) return
  await deleteNote(props.id)
  router.push('/')
}

onMounted(() => {
  getNote()
})
</script>
<template>
  <div v-if="!loading">
    <q-card>
      <q-card-section class="text-h5">
        <q-badge>{{item.category}}</q-badge>
        {{item.title}}
      </q-card-section>
      <q-card-section style="white-space:pre">
        {{item.content}}
      </q-card-section>
      <q-card-section>
        작성일: {{item.createdAt}}<br>
        수정일: {{item.updatedAt}}
      </q-card-section>
      <q-card-actions>
        <q-space />
        <q-btn to="/" label="목록" icon="mdi-arrow-left" />
        <q-btn :to="`/note/${id}/update`" label="수정" icon="mdi-pencil" color="warning" />
        <q-btn @click="remove" label="삭제" icon="mdi-delete" color="negative" />
      </q-card-actions>
    </q-card>
  </div>
  <div v-else><q-circular-progress  indeterminate  /></div>
</template>
