<script setup lang="ts">
import { ref } from 'vue'
import { useAuth, firebaseUser, loading } from 'src/composables/useAuth'
import SignIn from 'src/components/SignIn.vue'
import SignInBtn from 'src/components/SignInBtn.vue'
const drawer = ref(false)
const { logIn, logOut } = useAuth()

const env = process.env.NODE_ENV
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated v-if="firebaseUser && !loading">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        />

        <q-toolbar-title>
          Quasar App {{ env }}
        </q-toolbar-title>

        <SignInBtn />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page v-if="loading" class="row justify-center items-center">
        <q-circular-progress indeterminate />
      </q-page>
      <SignIn v-else-if="!firebaseUser" />
      <router-view v-else />
    </q-page-container>
  </q-layout>
</template>
