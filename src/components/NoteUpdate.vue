<script setup lang="ts">
import { defineProps, onMounted, ref, computed } from 'vue'
import { useFirestore } from 'src/composables/useFirestore'
import { DocumentSnapshot, DocumentData } from 'firebase/firestore'
import { useRouter } from 'vue-router'
const { readNote, updateNote } = useFirestore()
const router = useRouter()
const props = defineProps<{ id: string }>()
const doc = ref<DocumentSnapshot<DocumentData> | null>(null)
const loading = ref(true)

const title = ref('')
const content = ref('')
const getNote = async () => {
  doc.value = await readNote(props.id)
  title.value = item.value.title
  content.value = item.value.content
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

const update = async () => {
  await updateNote(props.id, title.value, content.value)
  router.push('/note/' + props.id)
}

onMounted(() => {
  getNote()
})
</script>
<template>
  <div v-if="!loading">
    <q-card>

      <q-card-section class="q-gutter-sm">
        <q-input v-model="title"
        outlined label="title" />
        <q-input v-model="content" outlined label="content" type="textarea" />
      </q-card-section>
      <q-card-actions>
        <q-space />
        <q-btn to="/" label="목록" icon="mdi-arrow-left" />
        <q-btn label="저장" icon="mdi-content-save" @click="update" />
      </q-card-actions>
    </q-card>
  </div>
  <div v-else><q-circular-progress  indeterminate  /></div>
</template>
