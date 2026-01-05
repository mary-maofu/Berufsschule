var express = require('express');
var cors = require('cors');
const axios = require('axios');
const API_KEY = "RGAPI-7bb29c11-8f0a-460f-9817-5e2f73952d69";

var getInfoByPuuid = require('./routes/getInfoByPuuid')(API_KEY);
var searchByGameName = require('./routes/searchByGameName')(API_KEY);
var getInfoBySumId = require('./routes/getInfoBySumId')(API_KEY);
var getMatches = require('./routes/getMatches')(API_KEY);

var app = express();

app.use(cors());

app.use('/', getInfoByPuuid);
app.use('/', searchByGameName);
app.use('/', getInfoBySumId);
app.use('/', getMatches);

app.listen(4000, function () {
    console.log('CORS-enabled web server listening on port 4000');
}   );
