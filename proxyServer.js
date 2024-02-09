var express = require('express');
var cors = require('cors');
const axios = require('axios');
const API_KEY = "RGAPI-5504d285-6f5a-47d2-a1e1-6121bc08669c";

var getInfoByPuuid = require('./routes/getInfoByPuuid')(API_KEY);
var searchByGameName = require('./routes/searchByGameName')(API_KEY);
var getInfoBySumId = require('./routes/getInfoBySumId')(API_KEY);

var app = express();

app.use(cors());

app.use('/', getInfoByPuuid);
app.use('/', searchByGameName);
app.use('/', getInfoBySumId);

app.listen(4000, function () {
    console.log('CORS-enabled web server listening on port 4000');
}   );
