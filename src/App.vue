<template>
  <div id="app">
    <HelloYT/>
  </div>
</template>

  

<script>
import HelloYT from '@/components/HelloYT.vue'

export default {
  name: 'App',
  components: {
    HelloYT,
  },
  methods: {
  }
}
</script>

<style>
body {
  color: lightgray;
  background-color: #2c3e50;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
