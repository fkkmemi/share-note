<script setup lang="ts">
import NoteItem from 'src/components/NoteItem.vue'
import { useRoute } from 'vue-router'
const route = useRoute()

</script>
<template>
  <q-page padding>
    <NoteItem :id="(route.params.id as string)" />
  </q-page>
</template>
