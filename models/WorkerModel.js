const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = WorkerModel;
