'use strict'

const express = require('express');

require('dotenv').config();

const cors =require('cors');

const PORT = process.env.PORT;

const server = express();

server.use(cors());

const weather = require('./data/weather.json');

server.get('/', (request,response) => {
    response.status(200).send('Hello this is the home page');
})
server.listen(PORT,()=> {
    console.log(`Listening on PORT ${PORT}`);
})
// localhost:3008/weather?searchQ=
server.get('/weather',(request,response)=>{
    let searchQ = request.query.searchQ;
    let Ndata = weather.find(value => {
        if (value.city_name.toLocaleLowerCase() === searchQ.toLocaleLowerCase()) {
            return value;
        }
    })
    let NewArray = Ndata.data.map(Value => {
        return new ForeCast(Value.valid_date, Value.weather.description);
    })
    response.send(NewArray);
});
class ForeCast{
    constructor(a, b){
        this.date = a;
        this.description = b;
    }
}
server.get('*', (request, response) =>{
    response.status(404).send('NOT FOUND')
});
// function Error(error, request, response) {
//     response.status(500).send({'Status': 500,responseText:'sorry something went wrong'});

//   };