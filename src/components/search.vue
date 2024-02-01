<template>
    <div class="search">
      <div class="container">
        <h5>League of Legends Player Searcher</h5>
        <input class="mt-2 mb-2 rounded-3" type="text" v-model="searchText" @keyup.enter="searchForPlayer" />
        <button class="rounded-3" @click="searchForPlayer">Search for player</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  const API_KEY = "RGAPI-0c3f740e-039e-481f-975d-567e70b7b028";
  export default {
    data() {
      return {
        searchText: '', // Initialize searchText in data
      };
    },
    methods: {
      searchForPlayer() {
        // Access the search text using this.searchText
        console.log('Searching for player:', this.searchText);
        
        this.searchText = '';
      }
    }
  }
  </script>
  

  
<style lang="scss">
.search{
    .container{
        h5{
            font-size: 22px;
        }
        input{
            padding: 8px;
        }
        button{
            font-size: 18px;
        }
    }
}
</style>
  