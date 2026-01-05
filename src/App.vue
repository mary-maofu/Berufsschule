<template>
  <div id="app">
    <navbar />
    <div class="search-container">
    <div class="content">
      <Search />
    </div>
  </div>
    <footerArea/>
  </div>
</template>

<script>
import Search from './components/search.vue';
import navbar from "@/components/navbar.vue";
import footerArea from "@/components/footer.vue";
export default {
  name: 'App',
  components: {
    Search, // Register the Search component
    navbar,
    footerArea,
  }
}
</script>

<style lang="scss">
#app{
  height: 80vh;
}
.search-container{
  margin-bottom: 13%;
}
</style>