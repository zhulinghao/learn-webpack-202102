<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <hello-world></hello-world>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'App',
  data() {
    return {
      message: 'zlhhhhh'
    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>

<style lang="stylus" scoped>
h1
  background-color blue
</style>
