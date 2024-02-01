<template>
  <div id="app">
    <Search /> 
  </div>
</template>

<script>
import Search from './components/search.vue';

export default {
  name: 'App',
  components: {
    Search, // Register the Search component
  }
}
</script>

<style>
/* Add your styles here if needed */
</style>