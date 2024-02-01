import axios from 'axios';

const apiKey = 'RGAPI-0c3f740e-039e-481f-975d-567e70b7b028';
const baseUrl = 'https://euw1.api.riotgames.com';

const api = axios.create({
  baseURL: baseUrl,
});

export const getSummonerLevel = async (summonerName) => {
  try {
    const response = await api.get(`/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`);
    return response.data.summonerLevel;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
