<template>
  <div>
    <div v-if="!searchPerformed" class="search">
      <div class="search-area">
        <h2>PlayerInsights</h2>
        <input class="mb-4 fa-search mt-2 mb-2 rounded-3" placeholder="  &#x1F50D;  Search" type="text" v-model="searchText" @keyup.enter="searchAndFetchInfo" />
        <button class="btn-15 custom-btn" @click="searchAndFetchInfo">Search for player</button>
      </div>
    </div>
    <div v-if="searchPerformed" class="container">
      <!-- Content to display after search -->
      <div class="nav-search">

      </div>
      <playerProfile
  v-if="searchPerformed"
  :leagueEntries="leagueEntries"
  :gameName="gameName"
  :tagLine="tagLine"
  :summonerData="summonerData"
  :summonerLevel="summonerLevel"
  :profileIconId="profileIconId"
  :puuid="puuid" />
    </div>
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
      leagueEntries: [],
      searchText: '',
      gameName: '',
      tagLine: '',
      id: '',
      puuid: '',
      accountId: '',
      wins: [],
      losses: [],
      rank: [],
      tier: [],
      queueType: [],
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

      this.errorMessage = ''; // Clear the error message on successful validation
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
              // Initialize arrays to store league data
              this.wins = [];
              this.losses = [];
              this.rank = [];
              this.tier = [];
              this.queueType = [];
              this.leagueEntries = response.data.map(leagueData => ({
  wins: leagueData.wins,
  losses: leagueData.losses,
  rank: leagueData.rank,
  tier: leagueData.tier,
  queueType: leagueData.queueType,
}));


              // Iterate over each league entry in the response
              response.data.forEach(leagueData => {
                // Push data for each league entry into corresponding arrays
                this.wins.push(leagueData.wins);
                this.losses.push(leagueData.losses);
                this.rank.push(leagueData.rank);
                this.tier.push(leagueData.tier);
                this.queueType.push(leagueData.queueType);
              });
              console.log(response.data); // Optional: Log the entire league data array
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
  .search-area {
    display: flex;
    flex-flow: column;
    align-items: center;

    h2 {
      margin-top: 19rem;
    }

    input {
      padding: 12px;
      width: 50rem;
    }

    input:focus::placeholder {
      color: transparent;
    }
  }
}
</style>
