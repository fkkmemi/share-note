<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import MyCompoVue from './MyCompo.vue'
const test = 'abcdeee'
const t = ref<boolean>(false)
// const toggle = () => {
//   t.value = !t.value
//   console.log('t', t)
// }

const a = ref(3), b = ref(4)
const sum = computed(() => a.value + b.value)
const items = ref([{ message: 'Foo' }, { message: 'Bar' }, { message: 'Bar' }, { message: 'Bar' }])

watch(t, (newValue, oldValue) => {
  console.log('t', t.value, newValue, oldValue)
})

const input = ref<HTMLInputElement>()

onMounted(() => {
  if (!input.value) return
  input.value.focus()
})
</script>
<template>
  <q-page padding>
    <div v-if="t">t on</div>
    <div v-else> t off</div>
    <span v-html="test"></span>
    <q-btn @click="t = !t" label="toggle"> aaaa </q-btn>
    <q-chip :icon="t ? 'home' : 'event'">Add to calendar</q-chip>
    <q-input v-model.number="a" type="number"/>
    <q-input v-model="b" type="number"/>
    <q-badge :label="sum" />
    <q-card :class="t ? 'bg-red' : 'bg-primary'">
      sss
    </q-card>
    <li v-for="(item, i) in items" :key="i">
      {{ item.message }} {{ i}}
    </li>
    <q-chip v-for="i in 15" :key="i" :label="i - 1"></q-chip>
    <input ref="input" />
    <MyCompoVue label="label ok" text="ttttt" :age="333" @toggle="t = !t" > <q-chip>ijij</q-chip></MyCompoVue>
    <MyCompoVue label="labefffl ok" text="ttttt333" :age="33333" />
    <MyCompoVue label="label ok" text="ttttt" :age="333" />
    <MyCompoVue label="label ok" text="ttttt" :age="333" />
  </q-page>
</template>
