'use strict'

const express = require('express');

require('dotenv').config();

const cors = require('cors');

const PORT = process.env.PORT;

const server = express();

server.use(cors());

const NewMovie = require('./Module/Movie');

const NewWeather = require('./Module/Weather');



server.get('/', (request, response) => {
    response.status(200).send('Hello this is the home page');
})
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

// localhost:3008/movie?searchQuery=
server.get('/movie', NewMovie);

// localhost:3008/weather?city=
server.get('/weather', NewWeather);
server.get('*', (request, response) => {
    response.status(404).send('NOT FOUND')
});
