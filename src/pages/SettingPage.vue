<script setup lang="ts">
import { ref } from 'vue'
import { categories, useDatabase } from 'src/composables/useDatabase'
const { setCategories } = useDatabase()

const category = ref('')
const add = () => {
  if (categories.value.includes(category.value)) return
  categories.value.push(category.value)
  category.value = ''
  return setCategories()
}

const remove = (index: number) => {
  categories.value.splice(index, 1)
  return setCategories()
  //
}

</script>
<template>
  <q-page padding>
    <q-card>
      <q-toolbar>
        <q-toolbar-title>Category Settings</q-toolbar-title>
      </q-toolbar>
      <q-card-section>
        <q-input v-model="category" outlined label="category" />
      </q-card-section>
      <q-card-actions>
        <q-btn @click="add" label="add" />
      </q-card-actions>
      <q-card-section>
        <q-chip v-for="(item, i) in categories" :key="item" :label="item" color="info" @remove="remove(i)"
        removable />
      </q-card-section>
    </q-card>
  </q-page>
</template>
