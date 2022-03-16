<script setup lang="ts">
import { ref } from 'vue'
import { auth } from 'src/boot/firebase'
import {
  GoogleAuthProvider, signInWithPopup, signOut,
  onAuthStateChanged
} from 'firebase/auth'
const drawer = ref(false)
const provider = new GoogleAuthProvider()
const logIn = () => {
  signInWithPopup(auth, provider)
}

const logOut = () => {
  signOut(auth)
}

onAuthStateChanged(auth, (user) => {
  console.log('log')
  console.log(user)
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
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
          Quasar App
        </q-toolbar-title>

        <q-btn icon="mdi-login" round flat @click="logIn" />
        <q-btn icon="mdi-logout" round flat @click="logOut" />
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>
