'use-strict'

const request = require('superagent');

module.exports.process = function process(intentData, registry, log, cb) {
    
    if (intentData.intent[0].value !== 'sunrise') {
        return cb(new Error('Expected sunrise intent but got' + intentData.intent[0].value));
    }

    const location = intentData.location[0].value;

    const service = registry.get('sunrise');

    if (!service) { return cb(false, 'No service available') };

    request.get(`http://${service.ip}:${service.port}/service/${location}`)
    .then((res) => {
        if (!res.body.result) return cb('Error with sunrise service');

        return cb(null, `The sun rises at ${res.body.result} in ${location}.`);
    });
}