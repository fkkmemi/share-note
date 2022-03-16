<template>
  <div class="row q-col-gutter-xl">
    <div class="col-4" v-for="n in 5" :key="`xl-${n}`">
      <div class="my-content">&nbsp;</div>
    </div>
  </div>
  <div class="q-pa-md q-gutter-sm">
    <q-avatar color="red" text-color="white" icon="directions" />
    <q-avatar color="primary" text-color="white">J</q-avatar>
    <q-avatar size="100px" font-size="52px" color="teal" text-color="white" icon="directions" />
    <q-avatar size="24px" color="orange">J</q-avatar>
    <q-avatar>
      <img src="https://cdn.quasar.dev/img/avatar.png">
    </q-avatar>
    <p class="text-h3 text-capitalize">fwefwef</p>
  </div>
  <div>
    <q-chip v-for="i in 9" :key="i" :label="i + 'test'" dense></q-chip>
  </div>
</template>
<style lang="sass" scoped>
.my-content
  padding: 10px 15px
  background: rgba(86,61,124,.15)
  border: 1px solid rgba(86,61,124,.2)
</style>
