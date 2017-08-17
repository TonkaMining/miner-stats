const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dotenv = require('dotenv').load();
const StatsService = require('./statsService');
const MinerModel = require('./models/MinerModel');
const WorkerModel = require('./models/WorkerModel');

const mongoUri = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(mongoUri, { useMongoClient: true }, (err, res) => {
    if (err) {
        console.log (`ERROR connecting to: ${mongoUri} - ${err}`);

        return;
    }

    console.log (`Successfully connected to: ${mongoUri}`);
});

let isWorkerComplete = false;
let isMinerComplete = false;

function isCloseable() {
    return isWorkerComplete && isMinerComplete;
}

function closeConnection() {
    if (!isCloseable()) {
        return;
    }

    mongoose.disconnect();
}

function completeMiner() {
    isMinerComplete = true;

    closeConnection();
}

function completeWorker() {
    isWorkerComplete = true;

    closeConnection();
}

StatsService.getCurrentMinerStats().then(({ data }) => {
    const miner = new MinerModel(data.data);

    miner.save().then(() => completeMiner());
})
.catch((error) => {
    throw new Error('ERROR::: ', error);
});

StatsService.getCurrentWorkerStats().then(({ data }) => {
    const worker = new WorkerModel(data.data);

    worker.save().then(() => completeWorker());
})
.catch((error) => {
    throw new Error('ERROR::: ', error);
});

