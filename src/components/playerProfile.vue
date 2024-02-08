<template>
  <div class="playerProfile">
    <div v-if="summonerData">
      <h2>{{ gameName }}#{{ tagLine }}</h2>
      <img :src="'http://ddragon.leagueoflegends.com/cdn/11.6.1/img/profileicon/' + profileIconId + '.png'" alt="Profile Icon">
      <p>Summoner Level: {{ summonerLevel }}</p>
    </div>
    <div v-else>
      <p>No summoner data available</p>
    </div>
  </div>
</template>

<script>
export default {
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
    }
  }
};
</script>

<style scoped lang="scss">
.player-profile {
  /* Add your styling here */
}
</style>
