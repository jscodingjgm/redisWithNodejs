const express = require('express');
const fetch = require('node-fetch');

const redisClient = require('./connect-redis');

const app = express();
const port = 3000;

const redisCachedData = require('./middleware');

app.get('/', redisCachedData, async (req,res) => {
    function getCountryData(){
        return fetch('https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=india');
    }

    const countryDetail = await getCountryData();
    const getJSONData = await countryDetail.json();

    redisClient.set('countryData', JSON.stringify(getJSONData));

    res.json(getJSONData);
});

app.listen(port,() => {
    console.log('app is running on port'+ port)
})