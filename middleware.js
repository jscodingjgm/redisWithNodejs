const redisClient = require('./connect-redis');

const cachedData = (req, res, next) => {
    redisClient.get('countryData', (error, cachedData) => {
        if (error) throw error;

        if (cachedData != null) {
            res.json(JSON.parse(cachedData));
        } else {
            next();
        }
    });
}


module.exports = cachedData;