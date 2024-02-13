<template>
  <div class="playerProfile">
    <div v-if="summonerData">
      <h2>{{ gameName }}#{{ tagLine }}</h2>
      <img :src="'http://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/' + profileIconId + '.png'" alt="Profile Icon">
      <p>Summoner Level: {{ summonerLevel }}</p>
      <p>Queue Type: {{ queueType }}</p>
      <p>Wins: {{ wins }}</p>
      <p>Losses: {{ losses }}</p>
      <img :src="'src/components/icons/ranks/' + tier + '.png'" alt="Rank Icon">
      <p>Rank: {{ tier }} {{ rank }}</p>
      <p>Win Rate: {{ calculateWinRate(wins, losses) }}%</p>
    </div>
    <div v-else>
      <p>No summoner data available</p>
    </div>
    <getMatches ref="getMatches" :puuid="puuid" />
  </div>

</template>

<script>
import getMatches from './getMatches.vue';
export default {
  components: {
    getMatches
  },
  name: 'PlayerProfile',
  props: {
    summonerData: {
      type: Object,
      default: null
    },
    summonerLevel: {
      type: Number,
      default: null
    },
    profileIconId: {
      type: Number,
      default: null
    },
    gameName: {
      type: String,
      default: ''
    },
    tagLine: {
      type: String,
      default: ''
    },
    wins: {
      type: Number,
      default: 0
    },
    losses: {
      type: Number,
      default: 0
    },
    rank: {
      type: String,
      default: ''
    },
    tier: {
      type: String,
      default: ''
    },
    queueType: {
      type: String,
      default: ''
    },
    puuid: {
      type: String,
      default: ''
    }
  },
  methods: {
    calculateWinRate(wins, losses) {
      const totalGames = wins + losses;
      if (totalGames === 0) {
        return 'N/A';
      }
      const winRate = (wins / totalGames) * 100;
      return winRate.toFixed(2); // Return win rate rounded to 2 decimal places
    },
    getMatches(){
      this.$refs.getMatches.getMatches();
    }
  },

};
</script>
