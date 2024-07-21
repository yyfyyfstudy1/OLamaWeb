<template>
  <div id="app">
      <ApiStreamer/>
  </div>
</template>

<script>
import ApiStreamer from './components/ApiStreamer'
export default {
  name: 'App',
  components: {
      ApiStreamer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
