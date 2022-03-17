<script setup lang="ts">
import { ref } from 'vue'
import { useFirestore } from 'src/composables/useFirestore'
import { useRouter } from 'vue-router'
import { categories } from 'src/composables/useDatabase'
const { createNote } = useFirestore()
const title = ref('')
const content = ref('')
const category = ref('')
const router = useRouter()
const create = async () => {
  await createNote(title.value, content.value, category.value)
  router.push('/')
}
const existsRule = (val: string) => (val && val.length > 0) || 'Please type something'
const sizeRule = (val: string) => (val.length > 0 && val.length < 10000) || 'Please type something'
</script>
<template>
  <q-card>
    <q-form
      @submit="create"
      class="q-gutter-md"
    >
      <q-card-section class="q-gutter-sm">
        <q-input v-model="title"
        outlined label="title"
        :rules="[existsRule]" />
        <q-select v-model="category" :options="categories" outlined label="categories" :rules="[existsRule]"  />
        <q-input v-model="content" outlined label="content" type="textarea" :rules="[existsRule, sizeRule]"  />
      </q-card-section>
      <q-card-actions>
        <q-space />
        <q-btn to="/" label="목록" icon="mdi-arrow-left" />
        <q-btn type="submit" label="작성" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>
