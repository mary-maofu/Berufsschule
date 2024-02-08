var express = require('express');
var cors = require('cors');
const axios = require('axios');

var app = express();

app.use(cors());

const API_KEY = "RGAPI-11222b12-104e-4326-be33-0b007d5820ac";

//get puuid from riot id
app.get('/searchPlayer/:gameName/:tagLine', async (req, res) => {
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
// get info by puuid
app.get('/getSummonerInfo/:puuid', async (req, res) => {
    const { puuid } = req.params;

    try {
        const summonerInfoResponse = await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`);
        res.json(summonerInfoResponse.data); // Corrected from response.data to summonerInfoResponse.data
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



/*
//get past 5 games
// get localhost:4000/past5games
function getPlayerPUUID(playerName) {
    return axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}?api_key=${API_KEY}`)
    .then(response => {
        console.log(response.data);
        return response.data.puuid;
    }).catch(err => err);
}

app.get('/past5games', async (req, res) => {
    const playerName = "";
    const PUUID = await getPlayerPUUID(playerName);
    const API_CALL = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID}/ids?start=0&count=5&api_key=${API_KEY}`;

    // get API_CALL
    // give list of game IDS
    const gameIDs = await axios.get(API_CALL)
    .then(response => {
        return response.data;
    }).catch(err => err)
    console.log(gameIDs);
    // loop through game IDS
    // get game details
    var matchDataArray = [];
    for (var i = 0; i < gameIDs.length - 15; i++){
        const matchID = gameIDs[i];
        const matchData = await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${API_KEY}`)
            .then(response => response.data)
            .catch(err => err);
        matchDataArray.push(matchData);
    }
    // save game details
    res.json(matchDataArray);
});
*/

app.listen(4000, function () {
    console.log('CORS-enabled web server listening on port 4000');
}   );
