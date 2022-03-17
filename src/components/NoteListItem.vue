<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'

const props = defineProps<{ doc: QueryDocumentSnapshot<DocumentData> }>()
const item = computed(() => props.doc.data())

</script>
<template>
  <q-item :to="`/note/${doc.id}`">
    <q-item-section>
      <q-item-label>{{ item.title }}</q-item-label>
      <q-item-label>{{ item.content }}</q-item-label>
      <q-item-label>{{ item.createdAt.toDate().toLocaleString() }}</q-item-label>
      <q-item-label>{{ item.uid }}</q-item-label>

    </q-item-section>
  </q-item>
</template>
