const mongoose = require('mongoose');
const dotenv = require('dotenv').load();
const pollPoolStats = require('./pollPoolStats');

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

pollPoolStats();

const TEN_MINUTES = 1000 * 60 * 10;
global.setTimeout(
    () => {
        console.log('\n--- ---- ---');
        console.log('10 minutes elapsed, closing connection');
        mongoose.disconnect();
        console.log('\n--- ---- ---');
    },
    TEN_MINUTES
);

