const request = require('axios');

const MINER_ID = '20be2fbcbf6ae2e79af9365c52518f35e4cea735';
const WORKER_ID = 'tonka1';
const BASE_URL = 'https://api.ethermine.org/miner';

const StatsService = {
    getCurrentMinerStats: function getCurrentMinerStats(minerId = MINER_ID) {
        return request.get(`${BASE_URL}/${minerId}/currentStats`);
    },

    getCurrentWorkerStats: function getCurrentWorkerStats(minerId = MINER_ID, workerId = WORKER_ID) {
        return request.get(`${BASE_URL}/${minerId}/worker/${workerId}/currentStats`);
    }
}

module.exports = StatsService;
