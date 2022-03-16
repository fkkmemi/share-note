<script setup lang="ts">
import { } from 'vue'
import { firebaseUser, useAuth } from 'src/composables/useAuth'
const { logOut } = useAuth()

</script>
<template>
  <q-btn round flat>
    <q-avatar>
      <q-img :src="firebaseUser?.photoURL || 'https://picsum.photos/100'" />
    </q-avatar>
    <q-menu>
      <q-card>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>email</q-item-label>
              <q-item-label caption>{{ firebaseUser?.email }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>name</q-item-label>
              <q-item-label caption>{{ firebaseUser?.displayName }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-card-actions>
          <q-space />
          <q-btn @click="logOut" label="logout" icon="mdi-logout" color="primary" />
        </q-card-actions>
      </q-card>
    </q-menu>

  </q-btn>
</template>
