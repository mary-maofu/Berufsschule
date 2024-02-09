const express = require('express');
const axios = require('axios');

module.exports = (API_KEY) => {
    const router = express.Router();

    router.get('/getSummonerLeague/:summonerId', async (req, res) => {
        const { summonerId } = req.params;
        try {
            // Make a request to the Riot Games API
            const response = await axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`);
            // Return the response data to the client
            res.json(response.data);
        } catch (error) {
            // Handle errors
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    return router;
};
