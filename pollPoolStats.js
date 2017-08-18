const mongoose = require('mongoose');
const StatsService = require('./statsService');
const MinerModel = require('./models/MinerModel');
const WorkerModel = require('./models/WorkerModel');

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
    StatsService.getCurrentMinerStats()
        .then(({ data }) => {
            const miner = new MinerModel(data.data);

            miner.save()
                .then(() => completeMiner())
                .catch((error) => {
                    console.error('Error saving miner record', error);

                    completeMiner();
                });
        });

    StatsService.getCurrentWorkerStats()
        .then(({ data }) => {
            const worker = new WorkerModel(data.data);

            worker.save()
                .then(() => completeWorker())
                .catch((error) => {
                    console.error('Error saving miner record', error);

                    completeWorker();
                });
        });
}

module.exports = pollPoolStats;
