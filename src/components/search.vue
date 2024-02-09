<template>
  <div class="search">
    <div class="container">
      <h5>Player Searcher</h5>
      <input class="mt-2 mb-2 rounded-3" type="text" v-model="searchText" @keyup.enter="searchAndFetchInfo" />
      <button class="btn-15 custom-btn" @click="searchAndFetchInfo">Search for player</button>
    </div>
    <playerProfile v-if="searchPerformed" :gameName="gameName" :tagLine="tagLine" :summonerData="summonerData" :summonerLevel="summonerLevel" :profileIconId="profileIconId" />
  </div>
</template>

<script>
import playerProfile from './playerProfile.vue';
import axios from 'axios';

export default {
  components: {
    playerProfile
  },
  data() {
    return {
      searchText: '',
      gameName: '',
      tagLine: '',
      puuid: '',
      accountId: '',
      profileIconId: null,
      summonerData: null,
      summonerLevel: null,
      gameList: [], // Declare gameList as a reactive data property
      searchPerformed: false // Track whether search has been performed
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
            // set data to be used in playerProfile
            this.gameName = response.data.gameName;
            this.tagLine = response.data.tagLine;
            this.puuid = response.data.puuid;
            console.log(response.data);
            // Update summonerData with response data from the server
            this.summonerData = response.data;
            // Call getSummonerInfo() after setting puuid
            this.getSummonerInfo();
            this.searchPerformed = true; // Set searchPerformed to true after search
          })
          .catch(error => {
            console.error(error);
          });
    },
    getSummonerInfo() {
      if (!this.puuid) {
        console.error('puuid is not set');
        return;
      }

      axios.get(`http://localhost:4000/getSummonerInfo/${this.puuid}`)
          .then(response => {
            //set data to be used in playerProfile
            this.summonerLevel = response.data.summonerLevel;
            this.profileIconId = response.data.profileIconId;
            console.log(response.data);
            // Handle the response as needed
          })
          .catch(error => {
            console.error(error);
          });
    },

    searchAndFetchInfo() {
      this.searchForPlayer(); // First, search for player
    }
    /* getPlayerGames(event) {
      axios.get("http://localhost:4000/past5games")
          .then(response => {
            this.gameList = response.data; // Update gameList with response data
            console.log(this.gameList);
          })
          .catch(error => {
            console.error(error);
          });
      console.log(this.gameList);
    } */
  }
}
</script>

<style lang="scss">
.search {
  .container {
    display: flex;
    flex-flow: column;
    align-items: center;
    h5 {
      font-size: 22px;
    }

    input {
      padding: 8px;
      width: 50rem;
    }

    .custom-btn {
      color: #000000;
      border-radius: 5px;
      padding: 10px 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      display: inline-block;
      box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
      7px 7px 20px 0px rgba(0,0,0,.1),
      4px 4px 5px 0px rgba(0,0,0,.1);
      outline: none;
    }

    .btn-15 {
      background: #ffa7d1;
      border: none;
      z-index: 1;
    }
    .btn-15:after {
      position: absolute;
      content: "";
      width: 0;
      height: 100%;
      top: 0;
      right: 0;
      z-index: -1;
      background-color: #ff86b9;
      border-radius: 5px;
      box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
      7px 7px 20px 0px rgba(0,0,0,.1),
      4px 4px 5px 0px rgba(0,0,0,.1);
      transition: all 0.5s ease;
    }
    .btn-15:hover:after {
      left: 0;
      width: 100%;
    }
    .btn-15:active {
      top: 2px;
    }


  }
}
</style>
