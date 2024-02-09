const express = require('express');
const axios = require('axios');

module.exports = (API_KEY) => {
    const router = express.Router();

    router.get('/getSummonerInfo/:puuid', async (req, res) => {
        const { puuid } = req.params;

        try {
            const summonerInfoResponse = await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`);
            res.json(summonerInfoResponse.data); // Corrected from response.data to summonerInfoResponse.data
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });


    return router;
};
