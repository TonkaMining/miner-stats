const mongoose = require('mongoose');
const StatsService = require('./statsService');
const minerController = require('./miner/miner.controller');

const MINER_ID = process.env.MINER_ID || '';
const WORKER_ID = process.env.WORKER_ID || '';

function pollPoolStats() {
    StatsService.getHistoricalMinerStats(MINER_ID)
        .then(({data}) => minerController.saveMinerHistoricalStats(data, MINER_ID))
        .catch((error) => {
            throw error;
        });
}

module.exports = pollPoolStats;
