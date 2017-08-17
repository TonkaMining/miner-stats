const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = MinerModel;
