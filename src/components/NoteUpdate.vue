<script setup lang="ts">
import { defineProps, onMounted, ref, computed } from 'vue'
import { useFirestore } from 'src/composables/useFirestore'
import { DocumentSnapshot, DocumentData } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import { categories } from 'src/composables/useDatabase'
import { useStorage } from 'src/composables/useStorage'
const { readNote, updateNote } = useFirestore()
const { addImage } = useStorage()
const router = useRouter()
const props = defineProps<{ id: string }>()
const doc = ref<DocumentSnapshot<DocumentData> | null>(null)
const loading = ref(true)

const title = ref('')
const content = ref('')
const category = ref('')
const imageURL = ref('')
const imageFile = ref<File | null>(null)
const getNote = async () => {
  doc.value = await readNote(props.id)
  title.value = item.value.title
  content.value = item.value.content
  category.value = item.value.category
  imageURL.value = item.value.imageURL
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
    uid: data.uid,
    category: data.category,
    imageURL: data.imageURL
  }
})

const update = async () => {
  await updateNote(props.id, title.value, content.value, category.value, imageURL.value)
  router.push('/note/' + props.id)
}

const existsRule = (val: string) => (val && val.length > 0) || 'Please type something'
const sizeRule = (val: string) => (val.length > 0 && val.length < 10000) || 'Please type something'
const fileUpdate = async (image: File) => {
  imageURL.value = await addImage(image)
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
        outlined label="title" :rules="[existsRule]" />
        <q-select v-model="category" :options="categories" outlined label="categories" :rules="[existsRule]" />
        <q-input v-model="content" outlined label="content" type="textarea" :rules="[existsRule, sizeRule]" />
        <q-file v-model="imageFile" @update:model-value="fileUpdate" label="image" outlined />

      </q-card-section>

      <q-card-section v-if="imageURL">
        <q-img :src="imageURL" />
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
