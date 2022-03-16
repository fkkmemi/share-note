<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
defineProps<{ label: string, text: string, age?: number }>()
const emits = defineEmits<{(e: 'toggle'): void }>()
function change () {
  emits('toggle')
}
</script>
<template>
  <div>
    label: {{ label }} {{ text }} {{ age }}
    <q-btn label="gogo" @click="change" />

    slot<slot></slot>
  </div>
</template>
