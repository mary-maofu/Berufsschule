const express = require('express');
const axios = require('axios');

module.exports = (API_KEY) => {
    const router = express.Router();

    router.get('/searchPlayer/:gameName/:tagLine', async (req, res) => {
        const { gameName, tagLine } = req.params;
        try {
            // Make a request to the Riot Games API
            const response = await axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${API_KEY}`);
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
