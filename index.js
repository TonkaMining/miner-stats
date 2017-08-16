const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dotenv = require('dotenv').load();
const StatsService = require('./statsService');

const mongoUri = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(mongoUri, { useMongoClient: true }, (err, res) => {
    if (err) {
        console.log (`ERROR connecting to: ${mongoUri} - ${err}`);

        return;
    }

    console.log (`Succeeded connected to: ${mongoUri}`);
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

const minerSchema = Schema({
    time: Number,
    lastSeen: Number,
    reportedHashrate: Number,
    currentHashrate: Number,
    validShares: Number,
    invalidShares: Number,
    staleShares: Number,
    averageHashrate: Number,
    activeWorkers: Number,
    unpaid: Number,
    unconfirmed: mongoose.Schema.Types.Mixed
}, { collection: 'miners' });
const MinerModel = mongoose.model('MinerModel', minerSchema);

const workerSchema = Schema({
    time: Number,
    lastSeen: Number,
    reportedHashrate: Number,
    currentHashrate: Number,
    validShares: Number,
    invalidShares: Number,
    staleShares: Number,
    averageHashrate: Number
}, { collection: 'workers' });
const WorkerModel = mongoose.model('WorkerModel', workerSchema);

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

