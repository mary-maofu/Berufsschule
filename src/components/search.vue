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
  
  const API_KEY = "RGAPI-ca3dd482-441c-44f8-b78a-841876e62ed2";
  
  export default {
    data() {
      return {
        searchText: '',
      };
    },
    methods: {
      searchForPlayer() {
        // Set up correct API call
        const APICallString = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.searchText}?api_key=${API_KEY}`;
        
        // Handle API call
        axios.get(APICallString)
          .then(response => {
            // Success - Handle the response as needed
            console.log(response.data);
          })
          .catch(error => {
            // Error - Handle the error
            console.error(error);
          });
      }
    }
  }
  </script>
  
  <style lang="scss">
  .search {
    .container {
      h5 {
        font-size: 22px;
      }
      input {
        padding: 8px;
      }
      button {
        font-size: 18px;
      }
    }
  }
  </style>
  