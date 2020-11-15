<template>
  <div>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({
  name: 'App'
})
export default class App extends Vue {}
</script>
