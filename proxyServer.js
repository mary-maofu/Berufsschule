var express = require('express');
var cors = require('cors');
const axios = require('axios');
const API_KEY = "RGAPI-a8065848-103d-4d82-a4a7-9125737b87f0";

var getInfoByPuuid = require('./routes/getInfoByPuuid')(API_KEY);
var searchByGameName = require('./routes/searchByGameName')(API_KEY);

var app = express();

app.use(cors());

app.use('/', getInfoByPuuid);
app.use('/', searchByGameName);

app.listen(4000, function () {
    console.log('CORS-enabled web server listening on port 4000');
}   );
