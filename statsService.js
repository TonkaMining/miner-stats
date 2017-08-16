'use strict';
const request = require('axios');

const MINER_ID = process.env.MINER_ID || '';
const WORKER_ID = process.env.WORKER_ID || '';
const BASE_URL = 'https://api.ethermine.org/miner';

function hasCredentials(credential) {
    return typeof credential !== 'undefined' && credential !== '';
}

const StatsService = {
    getCurrentMinerStats: function getCurrentMinerStats(minerId = MINER_ID) {
        if (!hasCredentials(minerId)) {
            throw new Error(`Invalid credentials, minerId is undefined: ${minerId}`);
        }

        return request.get(`${BASE_URL}/${minerId}/currentStats`);
    },

    getCurrentWorkerStats: function getCurrentWorkerStats(minerId = MINER_ID, workerId = WORKER_ID) {
        if (!hasCredentials(minerId) || !hasCredentials(workerId)) {
            throw new Error(`Invalid credentials, minerId or workerId is undefined: minerId: ${minerId} workerId: ${workerId}`);
        }

        return request.get(`${BASE_URL}/${minerId}/worker/${workerId}/currentStats`);
    }
}

module.exports = StatsService;
