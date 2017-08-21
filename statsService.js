const request = require('axios');

const BASE_URL = 'https://api.ethermine.org/miner';

function hasCredentials(credential) {
    return typeof credential !== 'undefined' && credential !== '';
}

const StatsService = {
    getHistoricalMinerStats: function getHistoricalMinerStats(minerId) {
        if (!hasCredentials(minerId)) {
            throw new Error(`Invalid credentials, minerId is undefined: ${minerId}`);
        }

        return request.get(`${BASE_URL}/${minerId}/history`).then((response) => response);
    },

    // getCurrentMinerStats: function getCurrentMinerStats(minerId) {
    //     if (!hasCredentials(minerId)) {
    //         throw new Error(`Invalid credentials, minerId is undefined: ${minerId}`);
    //     }

    //     return request.get(`${BASE_URL}/${minerId}/currentStats`).then((response) => response);
    // },

    // getCurrentWorkerStats: function getCurrentWorkerStats(minerId, workerId) {
    //     if (!hasCredentials(minerId) || !hasCredentials(workerId)) {
    //         throw new Error(`Invalid credentials, minerId or workerId is undefined: minerId: ${minerId} workerId: ${workerId}`);
    //     }

    //     return request.get(`${BASE_URL}/${minerId}/worker/${workerId}/currentStats`);
    // }
}

module.exports = StatsService;
