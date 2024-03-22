<template>
  <div class="getMatches">
    <button class="btn-15 custom-btn" @click="getMatches">Get Matches</button>
    <div class="match">
    <div v-for="match in matchList" :key="match.gameId">
      <div class="text-info-games d-flex gap-5 mt-5 mb-5">
      <h2>{{ match.gameId }}</h2> 
      <p>Game Mode: {{ match.gameMode }}</p>
      <p>Game Duration: {{ match.gameDuration }}</p>
      <p>Game Type: {{ match.gameType }}</p>
      <div v-for="team in match.teams" :key="team.win">
        <p>Team Win: {{ team.win }}</p>
      </div>
      </div>
<div class=" players-match d-flex col-6">
      <div class="me-5" v-for="participant in match.participants" :key="participant.summonerName">
        <div class="participant">
          <div class="profile d-flex">
            <img :src="getChampionIcon(participant.championId)" :alt="participant.championName" width="50" height="50">
            <div class="names">
            <p>Summoner Name: {{ participant.summonerName }}</p>
            <p>Played: {{ participant.championName }}</p>
            <p>Team: {{ getTeamColor(participant.teamId) }}</p>
            </div>
          </div>

        <div class="kda">
          <p>KDA : &nbsp; {{ participant.kills }} / {{ participant.deaths }} / {{ participant.assists }}</p>
        </div>
        <div class="items d-flex mb-5">
        <div v-for="item in participant.items" :key="item">
          <img v-if="item !== 0" :src="getItemIcon(item)" :alt="item" width="40" height="40">
        </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'getMatches',
  props: {
    puuid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      matchList: [] // Store match details here
    };
  },
  methods: {
    async getMatches() {
      if (!this.puuid) {
        console.error('puuid is not set');
        return;
      }
      try {
        // Make a request to get matches
        const response = await axios.get(`http://localhost:4000/getMatches/${this.puuid}`);
        // Save the match details to the matchList array
        this.matchList = response.data;
        // Log the match details to the console
        console.log('Match Details:', this.matchList);
      } catch (error) {
        console.error(error);
      }
    },
    getChampionIcon(championId) {
      // Return the champion icon URL from Community Dragon API
      return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;
    },
    getItemIcon(itemId) {
      // If itemId is 0, return null to skip displaying it
      if (itemId === 0) {
        return null;
      }
      // Return the item icon URL from Riot API (DDragon)
      return `http://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${itemId}.png`;
    },
    getTeamColor(teamId) {
    if (teamId === 100) {
      return 'Red'; // Return a string identifier for red team
    } else if (teamId === 200) {
      return 'Blue'; // Return a string identifier for blue team
    } else {
      return ''; // Default case, if needed
    }
  },
  }
}
</script>

<style scoped lang="scss">
.players-match{
  flex-flow: wrap;
}
</style>
