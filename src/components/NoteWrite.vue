<script setup lang="ts">
import { ref } from 'vue'
import { useFirestore } from 'src/composables/useFirestore'
import { useRouter } from 'vue-router'
const { createNote } = useFirestore()
const title = ref('')
const content = ref('')
const router = useRouter()
const create = async () => {
  await createNote(title.value, content.value)
  router.push('/')
}
</script>
<template>
  <q-card>
    <q-card-section class="q-gutter-sm">
      <q-input v-model="title"
      outlined label="title" />
      <q-input v-model="content" outlined label="content" type="textarea" />
    </q-card-section>
    <q-card-actions>
      <q-space />
      <q-btn @click="create" label="작성" />
    </q-card-actions>
  </q-card>
</template>
