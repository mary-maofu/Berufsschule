const express = require('express');
const axios = require('axios');

module.exports = (API_KEY) => {
    const router = express.Router();

    router.get('/getMatches/:puuid', async (req, res) => {
        const { puuid } = req.params;
        const { start = 0, count = 5 } = req.query; // Default start to 0 and count to 5

        try {
            // Make a request to the Riot Games API to get match IDs
            const response = await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&api_key=${API_KEY}`);
            const matchIds = response.data; // Extract match IDs from the response

            const filteredMatches = []; // Array to store filtered match details

            // Make API calls to get match details for each match ID
            for (const matchId of matchIds) {
                const matchResponse = await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`);

                // Filter match details to include only specific fields
                const filteredMatch = {
                    gameId: matchResponse.data.metadata.gameId,
                    gameMode: matchResponse.data.info.gameMode,
                    gameDuration: matchResponse.data.info.gameDuration,
                    gameType: matchResponse.data.info.gameType,
                    participants: matchResponse.data.info.participants.map(participant => ({
                        summonerName: participant.summonerName,
                        championName: participant.championName,
                        deaths: participant.deaths,
                        kills: participant.kills,
                        assists: participant.assists,
                        championId: participant.championId,
                        teamId: participant.teamId, // Include teamId for each participant
                        items: [
                            participant.item0,
                            participant.item1,
                            participant.item2,
                            participant.item3,
                            participant.item4,
                            participant.item5,
                            participant.item6
                        ],
                    })),
                    teams: matchResponse.data.info.teams.map(team => ({
                        teamId: team.teamId, // Include teamId for each team
                        win: team.win,
                        bans: team.bans,
                    })),
                };

                filteredMatches.push(filteredMatch);
            }

            // Return the array of filtered match details to the client
            res.json(filteredMatches);
        } catch (error) {
            // Handle errors
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    return router;
};
