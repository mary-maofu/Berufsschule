<template>
  <div class="basic-profile-info d-flex mt-5">
    <div class="name-level me-5">
    <h2>{{ gameName }}#{{ tagLine }}</h2>
      <img :src="'http://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/' + profileIconId + '.png'" width="160px" alt="Profile Icon" class="profileicon">
      <p class="level">Summoner Level: {{ summonerLevel }}</p>
    </div>
      <div class="left">
    <div v-if="summonerData">
      <div v-for="(entry, index) in leagueEntries" :key="index" class="league-entry">
 
  

  <div class="card">
  <h5 class="card-header mb-0"> <p>{{ formatQueueType(entry.queueType) }}</p></h5>
  <div class="card-body gap-5 d-flex">
    <div class="left-card-side">
      <img :src="'src/components/icons/ranks/' + entry.tier + '.png'" width="140px" alt="Rank Icon">
    </div>
    <div class="right-card-side pt-4">
    <h5 class="card-title">
      <p>Rank: {{ entry.tier }} {{ entry.rank }}</p>
    </h5>
      <div class="wins-loss">
  <p>Wins: {{ entry.wins }} Losses: {{ entry.losses }}</p>
  <p class="card-text">Win Rate: {{ calculateWinRate(entry.wins, entry.losses) }}%</p>

</div>
 
    </div>
  </div>
</div>
</div>
</div>
    <div v-else>
      <p>No summoner data available</p>
    </div>
    </div>

  <div class="playerProfile mt-5">
    </div>
  
    </div>
    <div class="right">
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
    leagueEntries: {
    type: Array,
    default: () => []
  },
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
    return winRate.toFixed(2); // Rundet den Siegesrate auf 2 Dezimalstellen
  },
  getMatches(){
    this.$refs.getMatches.getMatches();
  },
  formatQueueType(queueType) {
    if (queueType === 'RANKED_FLEX_SR') {
      return 'Ranked Flex';
    } else if (queueType === 'RANKED_SOLO_5x5') {
      return 'Ranked Solo';
    } else {
      return queueType; // Gibt den ursprünglichen Wert zurück, falls keine Übereinstimmung gefunden wurde
    }
  }
},
};
</script>
