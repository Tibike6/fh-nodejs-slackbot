'use strict';

const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');

module.exports = (config) => {
    const log = config.log();

    service.get('/service/:location', (req, res, next) => {
        request.get(`http://api.openweathermap.org/data/2.5/weather`)
            .query({q: req.params.location})
            .query({appid: config.openWeatherMapKey})
            .end((err, result) => {

                if (err) {
                    return next(err);
                }

                const sunrise = result.body.sys.sunrise;
                const time = moment.unix(sunrise).format('h:mm');
                return res.json({result: time});
        });
    });
    return service;
};