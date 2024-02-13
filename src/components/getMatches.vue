<template>
  <div class="getMatches">
    <button class="btn-15 custom-btn" @click="getMatches">Get Matches</button>
    <div v-for="match in matchList" :key="match.gameId">
      <h2>{{ match.gameId }}</h2>
      <p>Game Mode: {{ match.gameMode }}</p>
      <p>Game Duration: {{ match.gameDuration }}</p>
      <p>Game Type: {{ match.gameType }}</p>
      <div v-for="participant in match.participants" :key="participant.summonerName">
        <img :src="getChampionIcon(participant.championId)" :alt="participant.championName" width="50" height="50">
        <p>Champion Name: {{ participant.championName }}</p>
        <p>Kills: {{ participant.kills }}</p>
        <p>Deaths: {{ participant.deaths }}</p>
        <p>Assists: {{ participant.assists }}</p>
      </div>
      <div v-for="team in match.teams" :key="team.win">
        <p>Team Win: {{ team.win }}</p>
<!--        <p>Bans: {{ team.bans }}</p>-->
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
    }
  }
}
</script>

<style scoped lang="scss">
/* Add your scoped styles here */
</style>
