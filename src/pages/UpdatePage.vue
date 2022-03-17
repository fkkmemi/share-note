<script setup lang="ts">
import NoteUpdate from 'src/components/NoteUpdate.vue'
import { useRoute } from 'vue-router'
const route = useRoute()

</script>
<template>
  <q-page padding>
    <NoteUpdate :id="(route.params.id as string)" />
  </q-page>
</template>
