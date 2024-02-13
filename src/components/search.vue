<template>
  <div class="search">
    <div class="container">
      <h5>Player Searcher</h5>
      <input class="mt-2 mb-2 rounded-3" type="text" v-model="searchText" @keyup.enter="searchAndFetchInfo" />
      <button class="btn-15 custom-btn" @click="searchAndFetchInfo">Search for player</button>
    </div>
    <playerProfile v-if="searchPerformed" :queueType="queueType" :tier="tier" :id="id" :wins="wins" :losses="losses" :rank="rank" :gameName="gameName" :tagLine="tagLine" :summonerData="summonerData" :summonerLevel="summonerLevel" :profileIconId="profileIconId" :puuid="puuid" />
  </div>
</template>

<script>
import playerProfile from './playerProfile.vue';
import getMatches from './getMatches.vue';
import axios from 'axios';

export default {
  components: {
    playerProfile,
    getMatches,
  },
  data() {
    return {
      searchText: '',
      gameName: '',
      tagLine: '',
      id: '',
      puuid: '',
      accountId: '',
      wins: 0,
      losses: 0,
      rank: '',
      tier: '',
      queueType: '',
      profileIconId: null,
      summonerData: null,
      summonerLevel: null,
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
            // Set data to be used in playerProfile
            this.summonerLevel = response.data.summonerLevel;
            this.profileIconId = response.data.profileIconId;
            this.id = response.data.id;
            console.log(response.data);
            // Call getInfoBySumId() after setting id
            this.getInfoBySumId();
            // Handle the response as needed
          })
          .catch(error => {
            console.error(error);
          });
    },

    getInfoBySumId() {
      if (!this.id) {
        console.error('id is not set');
        return;
      }
      axios.get(`http://localhost:4000/getSummonerLeague/${this.id}`)
          .then(response => {
            // Check if response.data is an array and has at least one element
            if (Array.isArray(response.data) && response.data.length > 0) {
              const leagueData = response.data[0]; // Access the first (and only) element of the array
              // Set data to be used in playerProfile
              this.wins = leagueData.wins;
              this.losses = leagueData.losses;
              this.rank = leagueData.rank;
              this.tier = leagueData.tier;
              this.queueType = leagueData.queueType;
              console.log(leagueData);
              // Handle the response as needed
            } else {
              console.error('No league data available');
            }
          })
          .catch(error => {
            console.error(error);
          });
    },
    searchAndFetchInfo() {
      this.searchForPlayer(); // First, search for player
    },

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
