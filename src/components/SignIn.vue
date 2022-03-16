<script setup lang="ts">
import { useAuth } from 'src/composables/useAuth'
const { logIn } = useAuth()

</script>
<template>
  <q-page class="row items-center justify-evenly">
    <q-card>
      <q-card-section>
        로그인
      </q-card-section>
      <q-card-section>
        <q-btn @click="logIn" label="login" icon="mdi-google" />
      </q-card-section>
    </q-card>
  </q-page>
</template>
