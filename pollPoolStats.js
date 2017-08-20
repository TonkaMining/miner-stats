const mongoose = require('mongoose');
const StatsService = require('./statsService');
const saveMinerStats = require('./miner/miner.controller');
const saveWorkerStats = require('./worker/worker.controller');

const MINER_ID = process.env.MINER_ID || '';
const WORKER_ID = process.env.WORKER_ID || '';

function closeConnection() {
    if (!isCloseable()) {
        return;
    }

    mongoose.disconnect();
}

let isWorkerComplete = false;
let isMinerComplete = false;

function isCloseable() {
    return isWorkerComplete && isMinerComplete;
}

function completeMiner() {
    isMinerComplete = true;

    closeConnection();
}

function completeWorker() {
    isWorkerComplete = true;

    closeConnection();
}

function pollPoolStats() {
    StatsService.getCurrentMinerStats(MINER_ID)
        .then(({ data }) => saveMinerStats(data, MINER_ID, completeMiner))
        .catch((error) => {
            throw error;
        });

    StatsService.getCurrentWorkerStats(MINER_ID, WORKER_ID)
        .then(({ data }) => saveWorkerStats(data, MINER_ID, WORKER_ID, completeWorker))
        .catch((error) => {
            throw error;
        });
}

module.exports = pollPoolStats;
