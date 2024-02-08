<template>
  <div id="app">
    <div class="container">
    <div class="content">
      <Search />
    </div>
  </div>
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

<style lang="scss">
.container{
  padding: 13% 0 50px 0;
}
</style>