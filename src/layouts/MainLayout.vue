<script setup lang="ts">
import { ref } from 'vue'
import { firebaseUser, loading } from 'src/composables/useAuth'
import SignIn from 'src/components/SignIn.vue'
import SignInBtn from 'src/components/SignInBtn.vue'
const drawer = ref(false)

const menus = [
  { to: '/', name: 'Notes', icon: 'mdi-note' },
  { to: '/setting', name: 'Settings', icon: 'mdi-cog' },
  { to: '/about', name: 'About', icon: 'mdi-information' }
]

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
        <q-item v-for="item in menus" :key="item.to" :to="item.to">
          <q-item-section avatar>
            <q-icon :name="item.icon"></q-icon>
          </q-item-section>
          <q-item-section>
            {{item.name}}
          </q-item-section>
        </q-item>
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
