<template>
  <div class="search">
    <div class="container">
      <h5>Player Searcher</h5>
      <input class="mt-2 mb-2 rounded-3" type="text" v-model="searchText" @keyup.enter="searchForPlayer" />
      <button class="rounded-3" @click="searchForPlayer">Search for player</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const API_KEY = "RGAPI-11222b12-104e-4326-be33-0b007d5820ac";

export default {
  data() {
    return {
      searchText: '',
      gameName: '',
      tagLine: '',
      summonerData: null,
      gameList: [], // Declare gameList as a reactive data property
    };
  },
  methods: {
    searchForPlayer() {
      if (!this.searchText.includes('#')) {
        console.error('Invalid searchText format. Please enter gameName#tagLine');
        return;
      }

      const [gameName, tagLine] = this.searchText.split('#');

      axios.get(`http://localhost:4000/searchPlayer/${gameName}/${tagLine}`)
          .then(response => {
            // Log the response data in the console
            console.log(response.data);

            // Update summonerData with response data from the server
            this.summonerData = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    }
  }


  /*    getPlayerGames(event) {
        axios.get("http://localhost:4000/past5games")
            .then(response => {
              this.gameList = response.data; // Update gameList with response data
              console.log(this.gameList);
            })
            .catch(error => {
              console.error(error);
            });
        console.log(this.gameList);
      }*/

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
