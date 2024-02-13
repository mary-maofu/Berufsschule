<template>
  <div id="app">
    <navbar />
    <div class="container">
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
  height: 100vh;
}
.container{
  margin-bottom: 19%;
}
</style>